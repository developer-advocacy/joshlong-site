# joshlong-site

The site at [joshlong.com](https://joshlong.com).
It's a [Nuxt](https://nuxt.com) application that renders each page on the server, from what the GraphQL API at `api.joshlong.com` says.
That way search engines and link previews, most of which don't run JavaScript, see each page's content, title, description, and structured data in the first response.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

`NUXT_API_ROOT` says which API to use (`https://api.joshlong.com` by default), and `NUXT_PUBLIC_SITE_URL` the address the site builds its canonical URLs, sitemap, and redirects from (`https://joshlong.com`).

```bash
npm run lint
npx nuxt typecheck
npm run build && PORT=3000 npm start
```

## How it's put together

| Where | What |
|---|---|
| `server/utils/joshlong-api.ts` | the only code that calls the API; it caches every answer for ten minutes |
| `server/api/` | what the pages fetch: posts, a post, and the rest of the site's content |
| `server/routes/` | `/sitemap.xml`, `/feed.xml`, `/robots.txt`, and `/healthz` for the platform's health check |
| `server/middleware/canonical-url.ts` | 301s to one address per page: https, no `www`, `/jl/blogPost/`, no trailing slash |
| `server/plugins/compression.ts` | brotli or gzip for html, json, and xml |
| `app/composables/useSeo.ts` | each page's title, description, canonical URL, Open Graph and Twitter cards, and JSON-LD |
| `app/pages/` | the pages; a post is at `/jl/blogPost/<file>.html`, where it has always been |

## Deploying

A push to `main` builds a container image (see `.github/workflows/build-container.sh`) and has [`joshlong-pipeline`](https://github.com/developer-advocacy/joshlong-pipeline) deploy it to Cloud Foundry.
`./test_local_build.sh` builds the same image into the local Docker daemon.
