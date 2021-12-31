<template>
  <Zone class="post ">

    <div v-if="post" class="post">
      <img :alt="post.title" v-if="post.heroImageUrl" :src="post.heroImageUrl"/>
      <div class="date">{{ post.month }} {{ post.day }}, {{ post.year }}</div>
      <h2 v-html="post.title"></h2>
      <div class="text" v-html="post.html"></div>
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
    console.log('the results are ', this.post.html  )

  },


}
</script>
<style>


</style>
