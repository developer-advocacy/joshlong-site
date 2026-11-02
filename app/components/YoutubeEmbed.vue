<template>
  <!--
    youtube's player is a megabyte or so of javascript. show the thumbnail, and only load the
    player when somebody wants to watch.
  -->
  <div class="youtube-embed">
    <iframe
v-if="playing" :src="`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`"
            :title="video.title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen/>
    <a v-else :href="`https://www.youtube.com/watch?v=${video.id}`" class="poster" @click.prevent="playing = true">
      <img :src="video.thumbnail" :alt="video.title" width="480" height="360" loading="lazy">
      <span class="play" aria-hidden="true"/>
      <span class="visually-hidden">Play {{ video.title }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{ video: Video }>()
const playing = ref(false)
</script>

<style>
.youtube-embed {
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--common-gutter);
  background-color: var(--black);
}

.youtube-embed iframe, .youtube-embed .poster, .youtube-embed .poster img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.youtube-embed .poster img {
  object-fit: cover;
}

.youtube-embed .play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 72px;
  height: 72px;
  transform: translate(-50%, -50%);
  background-image: url("~/assets/images/play.png");
  background-size: contain;
  background-repeat: no-repeat;
  opacity: .85;
}

.youtube-embed .poster:hover .play, .youtube-embed .poster:focus-visible .play {
  opacity: 1;
}
</style>
