<template>
  <div>
    <Zone class="page videos-intro">
      <h1>Youtube</h1>
    </Zone>
    <Zone class="youtube-container">
      <CoffeeSoftwareVideos :latest-episode="videos?.coffeeSoftware[0] ?? null"/>
    </Zone>
    <Zone class="page">
      <VideoGrid :videos="videos?.coffeeSoftware.slice(1) ?? []"/>
    </Zone>
    <Zone class="youtube-container">
      <SpringTipsVideos :latest-episode="videos?.springTips[0] ?? null"/>
    </Zone>
    <Zone class="page">
      <VideoGrid :videos="videos?.springTips.slice(1) ?? []"/>
    </Zone>
  </div>
</template>

<script setup lang="ts">
const {data: videos} = await useFetch('/api/videos')
const {siteUrl} = useRuntimeConfig().public

useSeo({
  title: 'Videos: Coffee + Software and Spring Tips',
  description: 'Josh Long\'s videos: Coffee + Software, his (almost) daily stream, and Spring Tips, a weekly look at some corner of the Spring ecosystem.',
  path: '/videos',
})

useStructuredData(() => graph({
  '@type': 'ItemList',
  name: 'Videos by Josh Long',
  itemListElement: [...(videos.value?.coffeeSoftware ?? []), ...(videos.value?.springTips ?? [])].map((v, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'VideoObject',
      name: v.title,
      description: excerpt(v.description, 300) || v.title,
      thumbnailUrl: v.thumbnail,
      uploadDate: v.published,
      contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
      embedUrl: `https://www.youtube.com/embed/${v.id}`,
      author: {'@id': `${siteUrl}/#josh`},
    },
  })),
}))
</script>

<style>
.videos-intro {
  padding-bottom: 0;
}
</style>
