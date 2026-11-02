<template>
  <div class="posts-container">
    <div class="navigation">
      <NavigationArrows :newer-href="newerHref" :older-href="olderHref"/>
    </div>
    <div class="recent-posts-columns">
      <article v-for="post in posts" :key="post.path" class="recent-post-panel">
        <div class="recent-post">
          <NuxtLink v-if="post.heroImage" :to="postUrl(post.path)" tabindex="-1">
            <img :alt="plainText(post.title)" :src="post.heroImage" loading="lazy">
          </NuxtLink>
          <time class="date" :datetime="isoDate(post.date)">{{ formatDate(post.date) }}</time>
          <component :is="headingLevel" class="title">
            <NuxtLink :to="postUrl(post.path)"><span v-html="post.title"/></NuxtLink>
          </component>
          <div class="text" v-html="post.html"/>
          <div class="links">
            <div/>
            <NuxtLink v-if="post.truncated" class="read-post" :to="postUrl(post.path)">
              read more<span class="visually-hidden"> of {{ plainText(post.title) }}</span>
            </NuxtLink>
            <NuxtLink class="link" :to="postUrl(post.path)" :aria-label="plainText(post.title)"/>
          </div>
        </div>
      </article>
    </div>
    <div class="navigation">
      <NavigationArrows :newer-href="newerHref" :older-href="olderHref"/>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  posts: PostSummary[]
  newerHref?: string | null
  olderHref?: string | null
  headingLevel?: 'h2' | 'h3'
}>(), {newerHref: null, olderHref: null, headingLevel: 'h3'})
</script>

<style>

body {
  --link-icon-dimension: 20px;
}

a.link {
  grid-area: link;
}

a.read-post {
  grid-area: read;
}

div.links > a {
  text-align: right;
}

a.link {
  display: block;
  background-size: var(--link-icon-dimension) var(--link-icon-dimension);
  height: var(--link-icon-dimension);
  width: var(--link-icon-dimension);
  background-image: url("~/assets/images/link.png");
}

.posts-container .navigation {
  width: 100%;
}

.recent-posts-columns {
  margin-bottom: 10vh ;
}

.recent-posts-columns div.links a {
  color: var(--green-600);
}

.recent-posts-columns div.links {
  justify-items: right;
  display: grid;
  grid-template-areas: " .   read link";
  grid-template-columns: auto calc(4 * var(--link-icon-dimension)) calc( 2 * var(--link-icon-dimension));
}

.recent-post .title {
  margin-top: 0;
  font-size: 1.17em;
}

.recent-post .title a {
  color: var(--gray-800);
  text-decoration: none;
}

.recent-post .title a:hover {
  text-decoration: underline;
}

.recent-post .date {
  display: block;
}
</style>
