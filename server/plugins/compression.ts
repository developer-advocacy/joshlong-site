// the platform's router doesn't compress responses, so the server does: html, json, xml and text.
// the static files under /_nuxt are compressed when they're built (nitro.compressPublicAssets).
import {brotliCompressSync, constants, gzipSync} from 'node:zlib'

const compressible = /^(text\/|application\/(json|xml|rss\+xml|javascript))/

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('beforeResponse', (event, response) => {
    // nuxt's error handler renders the error page with an internal request, and reads the answer
    // back as text. compressing that would garble the 404 page.
    if (event.path.startsWith('/__nuxt_error')) return
    const body = response.body
    if (typeof body !== 'string' || body.length < 1024) return
    const headers = event.node.res
    if (headers.headersSent || headers.getHeader('content-encoding')) return
    const type = String(headers.getHeader('content-type') ?? 'text/html')
    if (!compressible.test(type)) return

    const accepted = String(getRequestHeader(event, 'accept-encoding') ?? '')
    const encoding = /\bbr\b/.test(accepted) ? 'br' : /\bgzip\b/.test(accepted) ? 'gzip' : null
    appendResponseHeader(event, 'vary', 'accept-encoding')
    if (!encoding) return

    response.body = encoding === 'br'
      ? brotliCompressSync(body, {params: {[constants.BROTLI_PARAM_QUALITY]: 5}})
      : gzipSync(body)
    setResponseHeader(event, 'content-encoding', encoding)
    removeResponseHeader(event, 'content-length')
  })
})
