<template>
  <YoutubeVideos
twitter="SpringTipsLive" github="spring-tips" :youtube="profiles.springTips"
                 :latest-episode="latestEpisode" :heading-level="headingLevel">
    <template #title>Spring Tips</template>
    <template #description>
      <p>
        I run a Youtube series called <a :href="profiles.springTips"><strong>Spring Tips</strong></a>
        (<a href="https://twitter.com/SpringTipsLive">@SpringTipsLive</a>).
        Want to learn about the latest-and-greatest aspects of the Spring ecosystem? You're in luck!
        On (<em>almost</em>) every Wednesday (give or take a few hours or days, timezones and production schedule
        permitting...), I look at some corner of the wide and wonderful world of <em>Springdom</em>.
      </p>
    </template>
  </YoutubeVideos>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ latestEpisode: Video | null, headingLevel?: 'h1' | 'h2' }>(), {headingLevel: 'h2'})
</script>
