<template>
  <Zone class="page about">
    <h1>About</h1>
    <div v-if="about" class="text" v-html="about.html"/>
  </Zone>
</template>

<script setup lang="ts">
const {data: about} = await useFetch('/api/about')
const {siteUrl} = useRuntimeConfig().public

useSeo(() => ({
  title: 'About Josh Long',
  description: about.value?.html ? excerpt(about.value.html, 200) : siteDescription,
  path: '/about',
  image: '/images/josh-long.jpg',
  imageAlt: 'Josh Long',
  type: 'profile',
}))

useStructuredData(() => graph({
  '@type': 'ProfilePage',
  url: `${siteUrl}/about`,
  mainEntity: {'@id': `${siteUrl}/#josh`},
}))
</script>

<style>
.about .text {
  max-width: 50em;
}
</style>
