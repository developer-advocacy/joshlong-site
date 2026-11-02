<template>
  <component :is="headingLevel" class="podcast-title">A Bootiful Podcast</component>
  <div class="podcast-description">
    I run a podcast called <a :href="profiles.podcast"><strong>A Bootiful Podcast</strong></a>, a celebration
    of the heroes that drive the Spring and Java
    ecosystems. It's also on Twitter (<a href="https://twitter.com/bootifulpodcast">@BootifulPodcast</a>).
    <NuxtLink v-if="showAllLink" to="/podcast">Here are the episodes.</NuxtLink>
  </div>
  <div class="podcast-logo">
    <img alt="A Bootiful Podcast" src="~/assets/images/bootiful-podcast-logo.png" width="385" height="128" loading="lazy">
  </div>
  <div class="latest-episode-panel"/>
  <div v-if="podcast" class="latest-episode-panel-content">
    <div class="image">
      <a :href="podcast.episodeUri" target="_blank" rel="noopener">
        <img :alt="podcast.title" :src="podcast.episodePhotoUri" loading="lazy">
      </a>
    </div>
    <div class="prompt">Latest episode</div>
    <div class="synopsis">
      <h3>{{ podcast.title }}</h3>
      <div v-html="podcast.description"/>
      <div class="listen">
        <a target="_blank" rel="noopener" :href="podcast.episodeUri">Listen Now</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  podcast: Podcast | null
  headingLevel?: 'h1' | 'h2'
  showAllLink?: boolean
}>(), {headingLevel: 'h2', showAllLink: true})
</script>

<style>

.player {
  grid-area: play;
}

.player audio {
  width: 100%;
  margin-bottom: calc(var(--page-top-pad));
  margin-top: calc(var(--page-top-pad));
}

.latest-episode-panel-content .image {
  grid-area: image;
  align-content: center;

  text-align: center;

  padding: var(--common-gutter);
}


.latest-episode-panel-content .image img {
  cursor: pointer;
  --guest-image-dimension: 80px;
  width: var(--guest-image-dimension);
  height: var(--guest-image-dimension);
  clip-path: circle(calc(var(--guest-image-dimension) / 2));
}

.podcast > .podcast-title {
  grid-area: listen;
  --microphone-size: 48px;
  background-image: url("~/assets/images/microphone.png");
  background-size: var(--microphone-size);
  line-height: var(--microphone-size);
  padding-left: calc(var(--microphone-size) + var(--common-gutter));
  background-repeat: no-repeat;
  margin-bottom: var(--common-gutter);
}

.podcast > .podcast-description {
  grid-area: text;
  font-style: normal;
  font-weight: normal;
  color: var(--gray-100);
  padding-right: calc(2 * var(--common-gutter));
}

.podcast > .podcast-logo > img {
  width: 80%;
}

.podcast > .podcast-logo {
  grid-area: logo;
  text-align: center;
  margin-top: calc(2 * var(--common-gutter));
  margin-bottom: calc(2 * var(--common-gutter));
}

.latest-episode-panel {
  /*
  hackety: we need the BG to be transparent but the
  contents (in the same grid spot) to be 100% opaque
  */
  margin-top: calc(1 * var(--common-gutter));
  grid-area: panel;
  background-color: #101828;
  opacity: 0.48;
  border-radius: var(--common-gutter);
  z-index: 1;
}

.latest-episode-panel-content {
  display: grid;
  margin-top: var(--common-gutter);
  margin-bottom: var(--common-gutter);
  padding: var(--common-gutter);
  opacity: 1;
  grid-area: panel;
  z-index: 2;

  grid-template-areas:
                "image prompt    "
                "image synopsis  "
                "play  play      ";
  grid-template-columns: calc( var(--guest-image-dimension) / 2 ) auto 80px;
  grid-template-rows:     auto auto;
}

.podcast {
  display: grid;

  padding-top: calc(var(--page-top-pad) * 2);
  padding-bottom: calc(var(--page-bottom-pad) * 2);
  background: rgb(7, 144, 82);
  background: linear-gradient(
      45deg,
      rgba(7, 144, 82, 1) 0%,
      rgba(67, 151, 146, 1) 55%,
      rgba(67, 151, 146, 1) 100%
  );
  color: white;
  grid-template-areas:
                    "listen   "
                    "text     "
                    "logo     "
                    "panel    ";
}

.latest-episode-panel-content > .synopsis {
  grid-area: synopsis;
  margin-bottom: calc(-1 * var(--common-gutter));
}

.latest-episode-panel-content > .synopsis > .listen {
  padding-top: var(--common-gutter);
}

.latest-episode-panel-content > .synopsis > p {
  color: var(--gray-300);
}

.latest-episode-panel-content > .synopsis > h3 {
  font-weight: 600;
  margin-top: 0;
}

.latest-episode-panel-content > .prompt {
  grid-area: prompt;
  margin-bottom: 1em;
  padding: 0;
}

@media screen and (min-width: 1000px) {

  .latest-episode-panel-content {

    grid-template-areas:
                "image prompt   "
                "image synopsis "
                "image play     ";
  }

  :root {
    --guest-image-dimension: 200px;
  }

  .podcast {
    grid-template-areas:
                "listen logo    "
                "text   logo    "
                "panel  panel   ";
    grid-template-rows: auto auto auto;
  }


}


.podcast > .podcast-title {
  font-size: 1.5em;
  font-weight: bold;
  color: var(--white);
  padding-top: 0;
}

.podcast a {
  color: var(--white);
}

.latest-episode-panel-content .image img {
  object-fit: cover;
}
</style>
