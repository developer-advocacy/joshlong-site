<template>
  <!-- a plain get form, so a search is a url: /blog?q=..., which works with or without javascript. -->
  <div class="search-form">
    <form action="/blog" method="get" role="search" @submit.prevent="search">
      <label for="post-search" class="visually-hidden">Search the blog</label>
      <input id="post-search" v-model="query" name="q" required type="search" placeholder="Search the blog">
      <div class="hint">
        You can use Lucene queries like : <code> content: "paris" AND title:"2019"</code>
      </div>
      <div class="buttons">
        <NuxtLink v-if="initialQuery" to="/blog" class="button">Reset</NuxtLink>
        <button :disabled="!query.trim()" type="submit">Search</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ initialQuery?: string }>()
const query = ref(props.initialQuery ?? '')
watch(() => props.initialQuery, (q) => {
  query.value = q ?? ''
})

async function search() {
  if (query.value.trim()) {
    await navigateTo({path: '/blog', query: {q: query.value.trim()}})
  }
}
</script>
