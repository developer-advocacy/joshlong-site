<template>
  <Zone class="notfound">
    <picture>
      <source :srcset="notFoundWebp" type="image/webp">
      <img
:src="notFoundPng" width="500" height="500"
           alt="Josh, looking a little lost">
    </picture>
    <div>
      <h1>Not found</h1>
      You seem a bit lost. If you were looking for something in particular, this ain't it! <br><br>
      Maybe it's in <NuxtLink to="/blog">the blog</NuxtLink>? Or, whenever I'm lost and don't know where to go,
      <a href="https://start.spring.io">start dot... spring dot...io</a>!
    </div>
  </Zone>
</template>

<script setup lang="ts">
import notFoundPng from '~/assets/images/not-found.png'
import notFoundWebp from '~/assets/images/not-found.webp'
</script>

<style>
.notfound {
  background-color: black;
  padding-bottom: 0;
  margin-bottom: 0;
  display: grid;
  --notfound-image-width: 400px;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-template-areas: " image "
                       "description ";
}

.notfound img {
  width: 100%;
  max-width: var(--notfound-image-width);
  height: auto;
  display: block;
  grid-area: image;
}

.notfound div {
  padding-top: calc(2 * var(--zone-padding));
  padding-bottom: calc(2 * var(--zone-padding));
  grid-area: description;
  font-size: larger;
  color: var(--gray-400);
}

.notfound h1 {
  padding-top: 0;
}

.notfound a {
  color: var(--light-green);
}

@media screen and (min-width: 1000px) {
  .notfound {
    padding-top: 80px;
    grid-template-columns: var(--notfound-image-width) auto;
    grid-template-areas: " image description ";
  }

  .notfound div {
    padding-right: var(--notfound-image-width);
  }
}
</style>
