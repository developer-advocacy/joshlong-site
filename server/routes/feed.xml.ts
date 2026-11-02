// an rss feed of the most recent posts, linking to their canonical addresses.
export default defineEventHandler(async (event) => {
  const {siteUrl} = useRuntimeConfig(event).public
  const posts = (await allPosts()).slice(0, 25)
  const items = posts.map(post => {
    const link = siteUrl + postUrl(post.path)
    return `    <item>
      <title>${escapeXml(plainText(post.title))}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.html)}</description>
    </item>`
  })
  setResponseHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>JoshLong.com</title>
    <link>${siteUrl}/</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(siteDescription)}</description>
    <language>en</language>
${items.join('\n')}
  </channel>
</rss>
`
})
