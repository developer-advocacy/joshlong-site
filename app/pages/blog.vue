<template>
  <Zone class="page recent-posts">
    <h1>{{ q ? 'Search results' : 'Blog' }}</h1>
    <PostSearch :initial-query="q"/>
    <p v-if="q && result && !result.posts.length" class="intro">
      Nothing matched <strong>{{ q }}</strong>. Try another search?
    </p>
    <PostList
v-if="result" :posts="result.posts" heading-level="h2"
              :newer-href="page > 1 ? pageHref(page - 1) : null"
              :older-href="page < lastPage ? pageHref(page + 1) : null"/>
    <p v-if="result && lastPage > 1" class="section-more">Page {{ page }} of {{ lastPage }}</p>
  </Zone>
</template>

<script setup lang="ts">
// every post is reachable from here by following links, a page at a time, which is how crawlers
// find the old ones. a search is a url too: /blog?q=spring.
const pageSize = 12
const route = useRoute()
const page = computed(() => Math.max(1, Number.parseInt(String(route.query.page ?? '1'), 10) || 1))
const q = computed(() => String(route.query.q ?? '').trim())

const {data: result, error} = await useFetch('/api/posts', {
  query: computed(() => ({offset: (page.value - 1) * pageSize, pageSize, q: q.value || undefined})),
})
if (error.value) {
  throw createError({statusCode: error.value.statusCode ?? 500, fatal: true})
}

const lastPage = computed(() => Math.max(1, Math.ceil((result.value?.total ?? 0) / pageSize)))
if (page.value > lastPage.value) {
  throw createError({statusCode: 404, statusMessage: 'there is no such page', fatal: true})
}

function pageHref(n: number) {
  const params = new URLSearchParams()
  if (q.value) params.set('q', q.value)
  if (n > 1) params.set('page', String(n))
  const query = params.toString()
  return '/blog' + (query ? `?${query}` : '')
}

useSeo(() => ({
  title: q.value ? `Search results for "${q.value}"` : page.value > 1 ? `Blog - page ${page.value}` : 'Blog',
  description: 'Josh Long\'s blog: Spring, Spring Boot, Java, Kotlin, AI, and whatever else happens to be going through his head, since 2007.',
  path: pageHref(page.value),
  noindex: !!q.value,
}))
</script>
