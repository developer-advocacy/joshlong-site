<template>
  <YoutubeVideos
twitter="starbuxman" github="coffee-software-show" :youtube="profiles.youtube"
                 :latest-episode="latestEpisode" :heading-level="headingLevel">
    <template #title>CoffeeSoftware</template>
    <template #description>
      <p>
        <a :href="profiles.twitter">I</a> stream <em>almost</em>
        every day about whatever happens to be going through my head on my
        personal Youtube channel, <a :href="profiles.youtube"><strong>@CoffeeSoftware</strong></a>.
        Most of the time it works out. Subscribe and come join the fun.
      </p>
    </template>
  </YoutubeVideos>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ latestEpisode: Video | null, headingLevel?: 'h1' | 'h2' }>(), {headingLevel: 'h2'})
</script>
