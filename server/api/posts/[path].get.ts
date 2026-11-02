export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path', {decode: true}) ?? ''
  const post = await postByPath(path)
  if (!post) {
    throw createError({statusCode: 404, statusMessage: 'there is no such post'})
  }
  return post
})
