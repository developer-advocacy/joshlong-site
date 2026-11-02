// everything the site knows comes from the graphql api at api.joshlong.com. only the server calls
// it: the pages get their data from this server's own /api/** routes, and the results are cached
// here, so a page view doesn't cost the api a round trip and a slow api doesn't slow every page.

// how long a cached answer is fresh. after that the stale one is served while it's refreshed.
const maxAge = 10 * 60

// the api's dates look like 2025-04-04T00:00Z. structured data and feeds want them in full.
function isoDateTime(date: string): string {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? date : parsed.toISOString()
}

async function graphql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const {apiRoot} = useRuntimeConfig()
  const response = await $fetch<{ data?: T, errors?: { message: string }[] }>(`${apiRoot}/graphql`, {
    method: 'POST',
    body: {query, variables},
    timeout: 15_000,
    retry: 1,
  })
  if (response.errors?.length || !response.data) {
    throw createError({
      statusCode: 502,
      statusMessage: `the api could not answer: ${response.errors?.map(e => e.message).join(', ') ?? 'no data'}`,
    })
  }
  return response.data
}

interface ApiPost {
  pathId: string
  title: string
  date: string
  heroImage: string | null
  heroParagraphs?: string
  heroParagraphsTruncated?: boolean
  processedContent?: string
  images?: string[]
}

const postSummaryFields = `pathId title date heroImage heroParagraphs heroParagraphsTruncated`

// the content repository has a few editor backup files (foo.md~) in it, and the api indexes them.
function isRealPost(post: ApiPost): boolean {
  return !post.pathId.endsWith('~')
}

function toPostSummary(post: ApiPost): PostSummary {
  return {
    path: post.pathId,
    title: post.title,
    date: isoDateTime(post.date),
    heroImage: post.heroImage || null,
    html: post.heroParagraphs ?? '',
    truncated: post.heroParagraphsTruncated ?? false,
  }
}

interface ApiPostPage {
  totalResultsSize: number
  offset: number
  pageSize: number
  posts: ApiPost[]
}

function toPostPage(page: ApiPostPage): PostPage {
  const posts = page.posts.filter(isRealPost)
  return {
    total: page.totalResultsSize - (page.posts.length - posts.length),
    offset: page.offset,
    pageSize: page.pageSize,
    posts: posts.map(toPostSummary),
  }
}

export const recentPosts = defineCachedFunction(async (offset: number, pageSize: number): Promise<PostPage> => {
  const data = await graphql<{ recentBlogPosts: ApiPostPage }>(`
      query ($offset: Int, $pageSize: Int) {
        recentBlogPosts(offset: $offset, pageSize: $pageSize) {
          totalResultsSize offset pageSize posts { ${postSummaryFields} }
        }
      }`, {offset, pageSize})
  return toPostPage(data.recentBlogPosts)
}, {name: 'recent-posts', maxAge, swr: true})

export const searchPosts = defineCachedFunction(async (query: string, offset: number, pageSize: number): Promise<PostPage> => {
  const data = await graphql<{ search: ApiPostPage }>(`
      query ($query: String, $offset: Int, $pageSize: Int) {
        search(query: $query, offset: $offset, pageSize: $pageSize) {
          totalResultsSize offset pageSize posts { ${postSummaryFields} }
        }
      }`, {query, offset, pageSize})
  return toPostPage(data.search)
}, {name: 'search-posts', maxAge, swr: true})

// every post, newest first, without their bodies: for the sitemap and the feed.
export const allPosts = defineCachedFunction(async (): Promise<PostSummary[]> => {
  return (await recentPosts(0, 100_000)).posts
}, {name: 'all-posts', maxAge, swr: true})

export const postByPath = defineCachedFunction(async (path: string): Promise<Post | null> => {
  const data = await graphql<{ blogPostByPath: ApiPost | null }>(`
      query ($path: String) {
        blogPostByPath(path: $path) { pathId title date heroImage heroParagraphs processedContent images }
      }`, {path})
  const post = data.blogPostByPath
  if (!post || !isRealPost(post)) return null
  return {
    ...toPostSummary(post),
    html: post.processedContent ?? '',
    truncated: false,
    description: excerpt(post.heroParagraphs || post.processedContent),
    images: post.images ?? [],
  }
}, {name: 'post-by-path', maxAge, swr: true})

interface ApiContent {
  title: string
  imageUrl: string
  html: string
}

interface ApiVideo {
  id: string
  title: string
  description: string
  published: string
  thumbnail: string
}

interface ApiSiteContent {
  about: string
  abstracts: string
  books: ApiContent[]
  livelessons: ApiContent[]
  appearances: { event: string, startDate: string, endDate: string, time: string, marketingBlurb: string }[]
  podcasts: { uid: string, title: string, date: string, description: string, episodeUri: string, episodePhotoUri: string }[]
  springtipsVideos: ApiVideo[]
  coffeesoftwareVideos: ApiVideo[]
}

export interface SiteContent {
  about: string
  talks: Talk[]
  books: Content[]
  livelessons: Content[]
  appearances: Appearance[]
  podcasts: Podcast[]
  springTipsVideos: Video[]
  coffeeSoftwareVideos: Video[]
}

function toContent(content: ApiContent[]): Content[] {
  return content.map(c => ({title: c.title, slug: slugify(c.title), imageUrl: c.imageUrl, html: c.html}))
}

function toVideos(videos: ApiVideo[]): Video[] {
  return videos
    .map(v => ({
      id: v.id,
      title: v.title,
      description: v.description ?? '',
      published: v.published,
      // the api hands out the 120px thumbnail. every video has this bigger one, too.
      thumbnail: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    }))
    .sort((a, b) => b.published.localeCompare(a.published))
}

// the abstracts are one html document: an <h2> for each talk's title, then its description.
function toTalks(html: string): Talk[] {
  const talks: Talk[] = []
  const slugs = new Set<string>()
  for (const section of html.split(/(?=<h2[\s>])/i)) {
    const match = section.match(/^<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*)$/i)
    if (!match) continue
    const title = plainText(match[1])
    let slug = slugify(title)
    for (let n = 2; slugs.has(slug); n++) slug = `${slugify(title)}-${n}`
    slugs.add(slug)
    talks.push({title, slug, html: match[2]!.trim()})
  }
  return talks
}

// everything that isn't a blog post comes back in one query: it's small, and it changes rarely.
export const siteContent = defineCachedFunction(async (): Promise<SiteContent> => {
  const video = `id title description published thumbnail`
  const content = `title imageUrl html`
  const data = await graphql<ApiSiteContent>(`
      query {
        about
        abstracts
        books { ${content} }
        livelessons { ${content} }
        appearances { event startDate endDate time marketingBlurb }
        podcasts { uid title date description episodeUri episodePhotoUri }
        springtipsVideos { ${video} }
        coffeesoftwareVideos { ${video} }
      }`)
  return {
    about: data.about,
    talks: toTalks(data.abstracts),
    books: toContent(data.books),
    livelessons: toContent(data.livelessons),
    appearances: data.appearances
      .map(a => ({event: a.event.trim(), startDate: a.startDate, endDate: a.endDate, time: a.time, blurb: a.marketingBlurb}))
      .sort((a, b) => a.startDate.localeCompare(b.startDate)),
    podcasts: data.podcasts
      .map(p => ({...p, date: isoDateTime(p.date)}))
      .sort((a, b) => b.date.localeCompare(a.date)),
    springTipsVideos: toVideos(data.springtipsVideos),
    coffeeSoftwareVideos: toVideos(data.coffeesoftwareVideos),
  }
}, {name: 'site-content', maxAge, swr: true})
