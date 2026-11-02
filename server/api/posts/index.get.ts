// a page of posts: the most recent ones, or the ones matching a search.
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const offset = Math.max(0, Number.parseInt(String(query.offset ?? '0'), 10) || 0)
  const pageSize = Math.min(50, Math.max(1, Number.parseInt(String(query.pageSize ?? '10'), 10) || 10))
  const q = luceneQuery(String(query.q ?? ''))
  const fetchPage = (from: number, size: number) => (q ? searchPosts(q, from, size) : recentPosts(from, size))
  try {
    return await fetchPage(offset, pageSize)
  }
  catch (error) {
    // the api fails, rather than answering with nothing, for a page past the last one. that's a
    // 404 for the page asking, not a server error, so answer with the total and no posts.
    if (offset === 0) throw error
    const {total} = await fetchPage(0, 1)
    if (offset < total) throw error
    return {total, offset, pageSize, posts: []} satisfies PostPage
  }
})
