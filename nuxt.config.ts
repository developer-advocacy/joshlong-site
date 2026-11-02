// the site is rendered on the server, so that search engines and link previews (which mostly don't
// run javascript) see each page's content and metadata in the first response. the data comes
// from the graphql api at api.joshlong.com, which the server calls, caches, and hands to the pages.
export default defineNuxtConfig({

  compatibilityDate: '2026-11-01',

  modules: ['@nuxt/eslint'],

  devtools: {enabled: false},

  components: [{path: '~/components', pathPrefix: false}],

  css: ['@fontsource-variable/inter', '~/assets/main.css'],

  runtimeConfig: {
    // NUXT_API_ROOT. only the server talks to the api.
    apiRoot: 'https://api.joshlong.com',
    public: {
      // NUXT_PUBLIC_SITE_URL. every canonical url, sitemap entry, and redirect is built from this.
      siteUrl: 'https://joshlong.com',
    },
  },

  app: {
    head: {
      htmlAttrs: {lang: 'en'},
      meta: [
        {name: 'theme-color', content: '#000000'},
      ],
      link: [
        {rel: 'icon', href: '/favicon.ico'},
        {rel: 'alternate', type: 'application/rss+xml', title: 'JoshLong.com', href: '/feed.xml'},
      ],
    },
  },

  routeRules: {
    '/_nuxt/**': {headers: {'cache-control': 'public, max-age=31536000, immutable'}},
  },

  nitro: {
    compressPublicAssets: true,
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
})
