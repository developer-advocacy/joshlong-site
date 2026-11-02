export default defineEventHandler(async () => ({html: (await siteContent()).about}))
