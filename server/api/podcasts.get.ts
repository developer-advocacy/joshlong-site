// the most recent episodes. there are hundreds, and the feed has them all.
export default defineEventHandler(async () => (await siteContent()).podcasts.slice(0, 24))
