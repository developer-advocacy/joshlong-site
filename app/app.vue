<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup lang="ts">
const {siteUrl} = useRuntimeConfig().public

// a page's own title comes first: "Bootiful Spring Boot | Josh Long".
useHead({
  titleTemplate: (title?: string) => (title && title !== 'Josh Long' ? `${title} | Josh Long` : 'Josh Long - Spring Developer Advocate'),
})

// who josh is, and what this site is, on every page, so the rest of the structured data can refer to it.
useStructuredData(graph(personSchema(siteUrl), websiteSchema(siteUrl)))
</script>
