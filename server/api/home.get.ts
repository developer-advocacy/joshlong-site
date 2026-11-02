// what the home page shows: a little of everything.
export default defineEventHandler(async () => {
  const content = await siteContent()
  return {
    appearances: upcoming(content.appearances),
    podcast: content.podcasts[0] ?? null,
    books: content.books,
    livelessons: content.livelessons,
    springTips: content.springTipsVideos[0] ?? null,
    coffeeSoftware: content.coffeeSoftwareVideos[0] ?? null,
  }
})
