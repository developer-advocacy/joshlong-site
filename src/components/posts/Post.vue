<template>
  <Zone class="post ">
    <div v-if="post" class="post">
      <img :alt="post.title" v-if="post.heroImageUrl" :src="post.heroImageUrl"/>
      <div class="date">{{ post.month }} {{ post.day }}, {{ post.year }}</div>
      <h2 v-html="post.title"></h2>
      <div class="text" v-html="post.html"></div>
    </div>
    <div>

      <!-- You can specify a per page discussion id on the next line, if your URLs might change. -->
      <div class="talkyard-comments" data-discussion-id="" style="margin-top: 45px;">
        <noscript>Please enable Javascript to view comments.</noscript>
        <p style="margin-top: 25px; opacity: 0.9; font-size: 96%">Comments powered by
          <a href="https://www.talkyard.io">Talkyard</a>.</p>
      </div>

    </div>
  </Zone>
</template>
<script>
import Zone from "@/components/Zone";
import {BlogService} from "@/blog-service";

const blogService = new BlogService()

export default {
  name: 'Post',
  components: {Zone},
  props: ['postUri'],

  data() {
    return {post: null}
  },
  async created() {
    this.post = (await blogService.byPath(this.postUri))
  },
}
</script>
<style>
</style>
