<template>
  <Zone class="page livelessons">
    <h1>Livelessons</h1>
    <div class="intro"><LivelessonsIntro/></div>
    <ContentList v-if="livelessons" :content="livelessons"/>
  </Zone>
</template>

<script setup lang="ts">
const {data: livelessons} = await useFetch('/api/livelessons')

useSeo(() => ({
  title: 'Livelessons video courses by Josh Long',
  description: 'In-depth video courses on Spring, from Josh Long and friends: '
    + (livelessons.value ?? []).map(l => l.title).join(', ') + '.',
  path: '/livelessons',
  image: livelessons.value?.[0]?.imageUrl,
}))
</script>
