<template>
  <div class="recent-posts-columns">
    <div v-for="post in posts " :key="post.path ">
      <div class="recent-post-panel">
        <div class="recent-post">

          <img :alt="post.title" v-if="post.heroImageUrl" :src="post.heroImageUrl"/>
          <div class="date">{{ post.month }} {{ post.day }}, {{ post.year }}</div>
          <h3 v-html="post.title"></h3>
          <div class="text" v-html="post.html"></div>
          <a class="read-post" :href="buildUrlForPost(post)">Read </a>
        </div>
      </div>
    </div>
  </div>
<!--  <div v-if="!truncated " class="buttons">
    <button>See More</button>
  </div>-->

</template>
<script>
export default {
  name: 'Posts',
  components: {},
  props: ['posts', 'truncated', 'postResolver'],
  methods: {
    buildUrlForPost(post) {
      return '/jl/blogPost/' + post.path
    }
  }

}
</script>
<style>

</style>
