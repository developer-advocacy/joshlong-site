<template>
  <div>
    <Zone class="podcast">
      <RecentPodcast :podcast="episodes?.[0] ?? null" heading-level="h1" :show-all-link="false"/>
    </Zone>
    <Zone class="page episodes">
      <h2>Recent episodes</h2>
      <ol class="episode-list">
        <li v-for="episode in episodes" :key="episode.uid || episode.episodeUri">
          <h3><a :href="episode.episodeUri" target="_blank" rel="noopener">{{ episode.title }}</a></h3>
          <time :datetime="isoDate(episode.date)">{{ formatDate(episode.date) }}</time>
          <p>{{ excerpt(episode.description, 300) }}</p>
        </li>
      </ol>
      <p class="section-more">Every episode is at <a :href="profiles.podcast">bootifulpodcast.fm</a>.</p>
    </Zone>
  </div>
</template>

<script setup lang="ts">
const {data: episodes} = await useFetch('/api/podcasts')
const {siteUrl} = useRuntimeConfig().public

useSeo({
  title: 'A Bootiful Podcast',
  description: 'A Bootiful Podcast, hosted by Josh Long: a celebration of the heroes that drive the Spring and Java ecosystems.',
  path: '/podcast',
})

useStructuredData(() => graph({
  '@type': 'PodcastSeries',
  name: 'A Bootiful Podcast',
  url: profiles.podcast,
  description: 'A celebration of the heroes that drive the Spring and Java ecosystems.',
  author: {'@id': `${siteUrl}/#josh`},
  episode: (episodes.value ?? []).slice(0, 10).map(e => ({
    '@type': 'PodcastEpisode',
    name: e.title,
    url: e.episodeUri,
    datePublished: e.date,
    image: e.episodePhotoUri || undefined,
  })),
}))
</script>

<style>
.episodes .episode-list {
  list-style: none;
  padding: 0;
  max-width: 50em;
}

.episodes .episode-list li {
  padding-bottom: calc(2 * var(--common-gutter));
}

.episodes .episode-list h3 {
  margin-bottom: 0;
}

.episodes .episode-list h3 a {
  color: var(--gray-800);
}

.episodes .episode-list time {
  font-size: small;
  color: var(--gray-500);
}

.episodes .episode-list p {
  color: var(--gray-500);
  margin-top: .3em;
}
</style>
