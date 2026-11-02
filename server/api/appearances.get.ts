export default defineEventHandler(async () => {
  const {appearances} = await siteContent()
  const next = upcoming(appearances)
  const past = appearances.filter(a => !next.includes(a)).reverse()
  return {upcoming: next, past}
})
