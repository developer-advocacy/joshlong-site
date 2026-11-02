// helpers that turn the api's html fragments into the plain text that titles, descriptions,
// structured data, and feeds need. used on both the server and in the pages.

const namedEntities: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  ndash: '-', mdash: '-', hellip: '…', copy: '©', reg: '®', trade: '™',
}

export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === '#') {
      const hex = entity[1] === 'x' || entity[1] === 'X'
      const code = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10)
      return Number.isNaN(code) ? match : String.fromCodePoint(code)
    }
    return namedEntities[entity.toLowerCase()] ?? match
  })
}

export function plainText(html: string | null | undefined): string {
  if (!html) return ''
  const withoutMarkup = html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
  return decodeEntities(withoutMarkup).replace(/\s+/g, ' ').trim()
}

// a search-result-sized summary, cut at a word boundary.
export function excerpt(html: string | null | undefined, maxLength = 160): string {
  const text = plainText(html)
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > maxLength / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:-]+$/, '') + '…'
}

export function slugify(text: string): string {
  return plainText(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
