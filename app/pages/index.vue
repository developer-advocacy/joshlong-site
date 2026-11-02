<template>
  <div>
    <Hero/>

    <Zone v-if="home?.appearances.length" id="appearances" class="appearances">
      <Appearances :appearances="home.appearances"/>
      <p class="section-more"><NuxtLink to="/appearances">All appearances</NuxtLink></p>
    </Zone>

    <Zone id="blog" class="recent-posts">
      <h2 class="visually-hidden">Recent Posts</h2>
      <PostSearch/>
      <PostList v-if="recent" :posts="recent.posts" :older-href="recent.total > pageSize ? '/blog?page=2' : null"/>
      <p class="section-more"><NuxtLink to="/blog">More posts</NuxtLink></p>
    </Zone>

    <Zone id="podcast" class="podcast">
      <RecentPodcast :podcast="home?.podcast ?? null"/>
    </Zone>

    <Zone v-if="home?.livelessons.length" id="livelessons" class="livelessons">
      <ContentCarousel :content="home.livelessons" side="l" details-path="/livelessons">
        <template #title>Livelessons</template>
        <template #description><LivelessonsIntro/></template>
      </ContentCarousel>
    </Zone>

    <Zone v-if="home?.books.length" id="books" class="books">
      <ContentCarousel :content="home.books" details-path="/books">
        <template #title>Books</template>
        <template #description><BooksIntro/></template>
      </ContentCarousel>
    </Zone>

    <Zone id="youtube" class="youtube-container">
      <CoffeeSoftwareVideos :latest-episode="home?.coffeeSoftware ?? null"/>
    </Zone>
    <Zone class="youtube-container">
      <SpringTipsVideos :latest-episode="home?.springTips ?? null"/>
    </Zone>
  </div>
</template>

<script setup lang="ts">
const pageSize = 10
const [{data: home}, {data: recent}] = await Promise.all([
  useFetch('/api/home'),
  useFetch('/api/posts', {query: {offset: 0, pageSize}}),
])

useSeo({
  title: 'Josh Long',
  description: siteDescription,
  path: '/',
  type: 'profile',
})
</script>
