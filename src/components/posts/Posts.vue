<template>
  <div class="posts-container">
    <div class="navigation">
      <a class="newer"  :class=" { 'enabled' : newerRemains }" @click.prevent="$emit('newer')" href="#">newer</a>
      <a class="older" :class=" { 'enabled' : olderRemains }" @click.prevent="$emit('older')" href="#">older</a>
    </div>
    <div class="recent-posts-columns">

      <div v-for="post in posts " :key="post.path ">
        <div class="recent-post-panel">
          <div class="recent-post">

            <img :alt="post.title" v-if="post.heroImageUrl" :src="post.heroImageUrl"/>
            <div class="date">{{ post.month }} {{ post.day }}, {{ post.year }}</div>
            <h3 v-html="post.title"></h3>
            <div class="text" v-html="post.html"></div>
            <div class="links">
              <div></div>
              <a class="read-post" v-if="post.heroParagraphsTruncated" :href="buildUrlForPost(post)">read more</a>
              <a class="link" :href="buildUrlForPost(post)"> </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'Posts',
  components: {},
  props: ['posts', 'postResolver', 'newerRemains', 'olderRemains'],
  created(){

  } ,
  methods: {
    buildUrlForPost(post) {
      return '/jl/blogPost/' + post.path
    }
  }

}
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
  background-image: url("~@/assets/images/link.png");


}

.posts-container .navigation {
  display: grid;
  grid-template-areas:  ". older newer .";
  grid-template-columns: auto 100px 100px auto;
  width: 100%;


}

.posts-container .navigation a {
  color: var(--gray-400);
}


.posts-container .navigation a.older {
  grid-area: older;
  text-align: right;
  padding-right: var(--common-gutter);

}

.posts-container .navigation a.newer {
  grid-area: newer;
  padding-left: var(--common-gutter);
}

.posts-container .navigation a.enabled {
  color: var(--black)
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
</style>
