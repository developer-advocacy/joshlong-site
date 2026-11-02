<template>
  <NuxtLayout>
    <NotFound v-if="error.statusCode === 404"/>
    <Zone v-else class="page">
      <h1>Something went wrong</h1>
      <p>Sorry! That didn't work. Please try again in a little while.</p>
      <p><NuxtLink to="/">Back to the home page</NuxtLink></p>
    </Zone>
  </NuxtLayout>
</template>
<script setup lang="ts">
import type {NuxtError} from '#app'

const props = defineProps<{ error: NuxtError }>()

useHead({title: props.error.statusCode === 404 ? 'Not found' : 'Something went wrong'})
// a missing page shouldn't end up in search results, or in anybody's link previews.
useSeoMeta({robots: 'noindex, follow'})
</script>
