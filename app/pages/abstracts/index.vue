<template>
  <Zone class="page abstracts">
    <h1>Abstracts</h1>
    <p class="intro">
      The talks I give. Organizers: you're welcome to use these abstracts, as they are, for your event.
    </p>
    <ul class="talk-index">
      <li v-for="talk in talks" :key="talk.slug"><a :href="`#${talk.slug}`">{{ talk.title }}</a></li>
    </ul>
    <section v-for="talk in talks" :id="talk.slug" :key="talk.slug" class="talk">
      <h2><NuxtLink :to="`/abstracts/${talk.slug}`">{{ talk.title }}</NuxtLink></h2>
      <div v-html="talk.html"/>
    </section>
  </Zone>
</template>

<script setup lang="ts">
const {data: talks} = await useFetch('/api/talks')

useSeo(() => ({
  title: 'Talks and abstracts',
  description: 'The conference talks and workshops Josh Long gives: '
    + (talks.value ?? []).map(t => t.title).join(', ') + '.',
  path: '/abstracts',
}))
</script>

<style>
.abstracts a {
  color: var(--gray-500);
}

.abstracts .talk h2 a {
  color: var(--gray-800);
  text-decoration: none;
}

.abstracts .talk-index {
  columns: 2;
}

.abstracts .talk, .abstracts .text {
  max-width: 50em;
}
</style>
