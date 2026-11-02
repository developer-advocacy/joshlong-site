<template>
  <Zone class="page appearances all-appearances">
    <Appearances v-if="appearances?.upcoming.length" :appearances="appearances.upcoming" heading-level="h1" show-year/>
    <template v-else>
      <h1 class="appearances-title">Upcoming Appearances</h1>
      <p>Nothing on the calendar just yet. Check back soon!</p>
    </template>
    <Appearances v-if="appearances?.past.length" :appearances="appearances.past" show-year>
      Past Appearances
    </Appearances>
  </Zone>
</template>

<script setup lang="ts">
const {data: appearances} = await useFetch('/api/appearances')

useSeo({
  title: 'Appearances',
  description: 'Where Josh Long is speaking next: conferences, Java user groups, and meetups around the world.',
  path: '/appearances',
})
</script>

<style>
.all-appearances.page a {
  color: var(--light-green);
}

.all-appearances > .appearances-title {
  font-size: 2em;
}
</style>
