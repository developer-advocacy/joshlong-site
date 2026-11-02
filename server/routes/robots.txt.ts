export default defineEventHandler((event) => {
  const {siteUrl} = useRuntimeConfig(event).public
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    // the json the pages are built from. the pages themselves are what should be indexed.
    'Disallow: /api/',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n')
})
