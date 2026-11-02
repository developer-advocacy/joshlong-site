// one address for every page: https, the bare domain (not www, or the platform's own route), the
// post urls spelled the way the site has always linked to them, and no trailing slashes.
export default defineEventHandler((event) => {
  const url = getRequestURL(event, {xForwardedHost: true, xForwardedProto: true})
  if (url.pathname === '/healthz') return

  const canonical = new URL(useRuntimeConfig(event).public.siteUrl)
  const local = url.hostname === 'localhost' || /^[\d.]+$/.test(url.hostname) || url.hostname.endsWith('.internal')
  let changed = false

  if (!local && (url.hostname !== canonical.hostname || url.protocol !== canonical.protocol)) {
    url.protocol = canonical.protocol
    url.host = canonical.host
    changed = true
  }

  const legacyPost = url.pathname.match(/^\/jl\/blogpost\/(.+)$/i)
  if (legacyPost && !url.pathname.startsWith('/jl/blogPost/')) {
    url.pathname = '/jl/blogPost/' + legacyPost[1]
    changed = true
  }

  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '')
    changed = true
  }

  if (changed) {
    return sendRedirect(event, url.toString(), 301)
  }
})
