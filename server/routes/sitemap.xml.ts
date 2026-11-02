// every page worth indexing: the section pages, each talk, and every post.
export default defineEventHandler(async (event) => {
  const {siteUrl} = useRuntimeConfig(event).public
  const [posts, content] = await Promise.all([allPosts(), siteContent()])
  const pages = ['/', '/about', '/blog', '/abstracts', '/books', '/livelessons', '/podcast', '/appearances', '/videos']
  const urls = [
    ...pages.map(path => ({loc: siteUrl + path, lastmod: posts[0]?.date})),
    ...content.talks.map(talk => ({loc: `${siteUrl}/abstracts/${talk.slug}`, lastmod: undefined})),
    ...posts.map(post => ({loc: siteUrl + postUrl(post.path), lastmod: post.date})),
  ]
  const entries = urls.map(u =>
    `  <url><loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ''}</url>`)
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`
})
