<template>
  <!-- everything in a carousel on the home page, all of it at once on its own page. -->
  <div class="content-list">
    <section v-for="item in content" :id="item.slug" :key="item.slug" class="content-item">
      <img :src="item.imageUrl" :alt="`The cover of ${item.title}`" loading="lazy">
      <div class="description">
        <h2>{{ item.title }}</h2>
        <div class="content" v-html="item.html"/>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{ content: Content[] }>()
</script>

<style>
.content-list .content-item {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: calc(2 * var(--common-gutter));
  padding-top: calc(3 * var(--common-gutter));
  padding-bottom: calc(3 * var(--common-gutter));
  border-bottom: 1px solid var(--gray-100);
}

.content-list .content-item img {
  width: 100%;
  max-width: 300px;
  border-radius: var(--common-gutter);
  border: 4px solid black;
}

.content-list .content-item h2 {
  margin-top: 0;
}

.content-list .content-item .content {
  display: block;
  color: var(--gray-500);
}

.content-list .content-item .buttons {
  text-align: left;
  margin-top: var(--common-gutter);
}

@media screen and (min-width: 1000px) {
  .content-list .content-item {
    grid-template-columns: 300px auto;
  }
}
</style>
