<template>
  <Zone v-if="post" class="page post">
    <nav class="breadcrumbs" aria-label="Breadcrumbs">
      <NuxtLink to="/">Home</NuxtLink> / <NuxtLink to="/blog">Blog</NuxtLink>
    </nav>
    <article>
      <header>
        <h1 class="post-title" v-html="post.title"/>
        <p class="date">
          <time :datetime="isoDate(post.date)">{{ formatDate(post.date, {month: 'long', day: 'numeric', year: 'numeric'}) }}</time>
          by <NuxtLink to="/about" rel="author">Josh Long</NuxtLink>
        </p>
        <img v-if="post.heroImage" class="hero-image" :alt="title" :src="post.heroImage" fetchpriority="high">
      </header>
      <div class="text" v-html="post.html"/>
    </article>
    <p class="section-more"><NuxtLink to="/blog">More posts</NuxtLink></p>
    <TalkyardComments :key="post.path"/>
  </Zone>
</template>

<script setup lang="ts">
const route = useRoute()
const path = computed(() => ([] as string[]).concat(route.params.path ?? []).join('/'))

const {data: post, error} = await useFetch(() => `/api/posts/${encodeURIComponent(path.value)}`)
if (error.value || !post.value) {
  throw createError({statusCode: error.value?.statusCode ?? 404, statusMessage: 'there is no such post', fatal: true})
}

const {siteUrl} = useRuntimeConfig().public
const title = computed(() => plainText(post.value!.title))
const url = computed(() => siteUrl + postUrl(post.value!.path))
const image = computed(() => post.value!.heroImage || post.value!.images[0] || null)

useSeo(() => ({
  title: title.value,
  description: post.value!.description || title.value,
  path: postUrl(post.value!.path),
  image: image.value,
  type: 'article',
  publishedTime: post.value!.date,
}))

useStructuredData(() => graph(
  {
    '@type': 'BlogPosting',
    '@id': `${url.value}#post`,
    headline: title.value.slice(0, 110),
    description: post.value!.description,
    datePublished: post.value!.date,
    url: url.value,
    mainEntityOfPage: url.value,
    image: image.value ? [image.value] : [siteUrl + defaultSocialImage],
    author: {'@id': `${siteUrl}/#josh`, '@type': 'Person', name: 'Josh Long', url: `${siteUrl}/about`},
    publisher: {'@id': `${siteUrl}/#josh`},
    isPartOf: {'@id': `${siteUrl}/#website`},
  },
  breadcrumbs(siteUrl, [['Blog', '/blog'], [title.value, postUrl(post.value!.path)]]),
))
</script>

<style>
.post .post-title {
  font-size: 2em;
  font-weight: bold;
  color: var(--gray-800);
  line-height: 1.2em;
  padding-bottom: 0;
}

.post .hero-image {
  display: block;
  margin-top: var(--common-gutter);
  max-height: 70vh;
  width: auto;
}

.post .text {
  max-width: 50em;
}

.post .text pre {
  overflow-x: auto;
}

@media screen and (min-width: 1000px) {
  .post .post-title {
    font-size: 300%;
  }
}
</style>
