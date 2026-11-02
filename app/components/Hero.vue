<template>
  <Zone class="hero">
    <div class="text">
      <h1 class="name">Josh Long</h1>
      <p class="description">
        A Spring Developer Advocate, Java Champion,
        Kotlin Google Developer Expert, author of numerous books,
        best-selling video trainer, open-source contributor,
        podcaster and YouTuber: hi, Spring fans! 👋
      </p>
      <NuxtLink to="/about" class="button">Get to know me</NuxtLink>
    </div>
    <div class="image">
      <!-- the biggest thing above the fold, so it's fetched first, and its size is known before it arrives. -->
      <picture>
        <source :srcset="heroWebp" type="image/webp">
        <img
:src="heroPng" width="500" height="634" fetchpriority="high" decoding="async"
             alt="Josh Long, in a Spring t-shirt, arms crossed and smiling">
      </picture>
    </div>
  </Zone>
</template>

<script setup lang="ts">
import heroPng from '~/assets/images/josh-hero-image.png'
import heroWebp from '~/assets/images/josh-hero-image.webp'
</script>

<style>
.hero {
  background-color: var(--black);
  grid-area: hero;
  color: var(--gray-100);
  display: grid;
  grid-template-areas:
                "text "
                "image";
  grid-template-rows: auto auto;
}

.hero > .text > .button {
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
  border-radius: var(--common-gutter);
  padding: calc(1.5 * var(--common-gutter));
  background-color: var(--black);
  border: 1px solid var(--light-green);
  margin-top: var(--common-gutter);
  color: var(--light-green);
}

.hero > .text {
  grid-area: text;
  padding-top: calc(4 * var(--page-top-pad));
}

.hero > .text > .description {
  margin: 0;
}

.hero > .image {
  text-align: center;
  padding: 0;
  margin: 0;
  margin-top: var(--common-gutter);
  line-height: 0;
  font-size: 0;
}

.hero > .image img {
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
}

/* the name is in the menu on small screens, but it's still the page's heading for search engines and screen readers. */
.hero > .text > .name {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media screen and (min-width: 1000px) {

  .hero {
    display: grid;
    grid-template-areas: "text image";
    grid-template-columns: auto 500px;
    padding-top: var(--page-top-pad);
  }

  .hero > .text > .name {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    clip-path: none;
    white-space: normal;
  }
}
</style>
