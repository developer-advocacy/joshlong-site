<template>
  <Zone v-if="talk" class="page abstracts">
    <nav class="breadcrumbs" aria-label="Breadcrumbs">
      <NuxtLink to="/">Home</NuxtLink> / <NuxtLink to="/abstracts">Abstracts</NuxtLink>
    </nav>
    <h1>{{ talk.title }}</h1>
    <div class="text" v-html="talk.html"/>
    <p class="intro">
      Want this talk at your event? <a :href="profiles.twitter">Get in touch</a>, and have a look at
      <NuxtLink to="/appearances">where I'll be next</NuxtLink>.
    </p>
    <h2>Other talks</h2>
    <ul>
      <li v-for="other in others" :key="other.slug">
        <NuxtLink :to="`/abstracts/${other.slug}`">{{ other.title }}</NuxtLink>
      </li>
    </ul>
  </Zone>
</template>

<script setup lang="ts">
const route = useRoute()
const {data: talks} = await useFetch('/api/talks')
const talk = computed(() => talks.value?.find(t => t.slug === route.params.slug))
if (!talk.value) {
  throw createError({statusCode: 404, statusMessage: 'there is no such talk', fatal: true})
}
const others = computed(() => (talks.value ?? []).filter(t => t.slug !== talk.value?.slug))
const {siteUrl} = useRuntimeConfig().public

useSeo(() => ({
  title: `${talk.value!.title} - a talk by Josh Long`,
  description: talk.value!.html,
  path: `/abstracts/${talk.value!.slug}`,
}))

useStructuredData(() => graph(
  breadcrumbs(siteUrl, [['Abstracts', '/abstracts'], [talk.value!.title, `/abstracts/${talk.value!.slug}`]]),
))
</script>
