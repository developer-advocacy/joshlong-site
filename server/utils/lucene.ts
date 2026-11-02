// the api's lucene index has no default field, so a query of plain words (graalvm native) matches
// nothing. look for them in the titles and the text. a query naming its fields (title:"2019") is
// left as it is.
export function luceneQuery(query: string): string {
  const q = query.trim()
  if (!q || /\w:/.test(q)) return q
  const terms = q.replace(/[()]/g, ' ').trim()
  return terms ? `title:(${terms}) OR content:(${terms})` : ''
}
