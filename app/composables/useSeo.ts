// the title, description, canonical address, and social preview card for a page. every page
// calls this, so that each has its own, and they're all in the html the server renders.
import type {MaybeRefOrGetter} from 'vue'

export interface SeoOptions {
  title: string
  description: string
  path: string
  image?: string | null
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  // for pages that shouldn't be in search results, like search results.
  noindex?: boolean
}

export const defaultSocialImage = '/images/josh-long-social.jpg'

export function useSeo(options: MaybeRefOrGetter<SeoOptions>) {
  const {siteUrl} = useRuntimeConfig().public
  const seo = computed(() => toValue(options))
  const absolute = (url: string) => (url.startsWith('http') ? url : siteUrl + url)
  const canonical = computed(() => siteUrl + (seo.value.path === '/' ? '/' : seo.value.path))
  const image = computed(() => absolute(seo.value.image || defaultSocialImage))
  const title = computed(() => plainText(seo.value.title))
  const description = computed(() => excerpt(seo.value.description, 200))

  useSeoMeta({
    title,
    description,
    robots: () => (seo.value.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
    ogSiteName: siteName,
    ogType: () => seo.value.type ?? 'website',
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogImage: image,
    ogImageAlt: () => seo.value.imageAlt ?? title.value,
    ogLocale: 'en_US',
    articlePublishedTime: () => seo.value.publishedTime,
    articleAuthor: () => (seo.value.type === 'article' ? [siteUrl + '/about'] : undefined),
    twitterCard: 'summary_large_image',
    twitterSite: '@starbuxman',
    twitterCreator: '@starbuxman',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  })
  useHead({
    link: [{rel: 'canonical', href: canonical}],
  })
}

// schema.org json-ld, so search engines know what a page is about: a person, a post, a book...
export function useStructuredData(data: MaybeRefOrGetter<object | object[] | null>) {
  useHead({
    script: [{
      type: 'application/ld+json',
      // json can't end a <script>, but a "</" inside a string could, so escape it.
      innerHTML: computed(() => {
        const value = toValue(data)
        return value ? JSON.stringify(value).replace(/</g, '\\u003c') : ''
      }),
    }],
  })
}
