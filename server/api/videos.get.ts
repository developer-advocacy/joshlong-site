export default defineEventHandler(async () => {
  const content = await siteContent()
  return {
    springTips: content.springTipsVideos.slice(0, 12),
    coffeeSoftware: content.coffeeSoftwareVideos.slice(0, 12),
  }
})
