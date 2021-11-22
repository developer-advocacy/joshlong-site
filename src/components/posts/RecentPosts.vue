<template>
  <div>
    <h2>Recent Posts </h2>

    <div class="recent-posts-columns">
      <div v-for="post in posts " :key="post.path ">
        <div class="recent-post-panel">
          <div class="recent-post">
            <img :alt="post.title" v-if="post.heroImageUrl" :src="post.heroImageUrl"/>
            <div class="date"> {{ post.date }}</div>
            <h3> {{ post.title }}</h3>
            <div class="text" v-html="post.html"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button>See More</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'RecentPosts',
  components: {},
  props: ['posts'],
  setup() {
  }
}
</script>
<style>

.recent-post-panel {
  padding: var(--common-gutter);
  display: inline-block;
}

.recent-post {
  display: inline-block;
  filter: drop-shadow(calc(var(--common-gutter) / 2) calc(var(--common-gutter) / 2) calc(var(--common-gutter) / 2) var(--gray-300));
  background-color: var(--white);
  padding: var(--common-gutter);
  border-radius: var(--common-gutter);
}

.recent-post img {
  width: 100%;
  border: 1px solid var(--gray-100);
}

.recent-post .date {
  font-size: smaller;
  color: var(--green-700);
  margin-bottom: var(--common-gutter);
  margin-top: var(--common-gutter);
}

.recent-post h2 {
  font-weight: bold;
  color: var(--gray-800);
  margin-bottom: var(--common-gutter);
}

.recent-post .text   p {
  color: var(--gray-500);
}


@media screen and (min-width: 1000px) {
  .recent-posts .recent-posts-columns {
    column-count: 3;
    column-gap: 0;
  }
}

.recent-posts .buttons {
  text-align: center;
}


</style>
