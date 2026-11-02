<template>
  <ul class="video-grid">
    <li v-for="video in videos" :key="video.id">
      <a :href="`https://www.youtube.com/watch?v=${video.id}`">
        <img :src="video.thumbnail" :alt="video.title" width="480" height="360" loading="lazy">
        <span class="title">{{ video.title }}</span>
      </a>
      <time :datetime="isoDate(video.published)">{{ formatDate(video.published) }}</time>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ videos: Video[] }>()
</script>

<style>
.video-grid {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: calc(2 * var(--common-gutter));
}

.video-grid img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--common-gutter);
}

.video-grid a {
  text-decoration: none;
}

.video-grid .title {
  display: block;
  color: var(--gray-800);
  font-weight: 600;
}

.video-grid time {
  font-size: small;
  color: var(--gray-500);
}
</style>
