<template>
  <div class="text">
    <component :is="headingLevel">
      <slot name="title"/>
    </component>
    <slot name="description"/>

    <div class="buttons">
      <a class="button icon youtube" :href="youtube">Learn on Youtube</a>
      <a class="button icon twitter" :href="`https://twitter.com/${twitter}`">Follow on Twitter</a>
      <a class="button icon spring-site" :href="`https://github.com/${github}`">Get Started Now</a>
    </div>
  </div>
  <div class="video">
    <YoutubeEmbed v-if="latestEpisode" :video="latestEpisode"/>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  latestEpisode: Video | null
  youtube: string
  twitter: string
  github: string
  headingLevel?: 'h1' | 'h2'
}>(), {headingLevel: 'h2'})
</script>

<style>
.youtube-container {

  padding-top: var(--page-top-pad);
  padding-bottom: var(--page-bottom-pad);
  background: linear-gradient(0deg, #101828, #101828);
  display: grid;
  grid-template-areas:
                "text "
                "video";
  grid-template-columns: auto;
  margin-top: var(--page-top-pad);
  margin-bottom: var(--page-top-pad);
}

.youtube-container .buttons .button {
  color: var(--white);
  border: 1px solid var(--white);
  background-color: var(--gray-900);
}

@media screen and (min-width: 1000px) {
  .youtube-container {
    grid-template-areas: "text video";
    grid-template-columns: 30% 70%;
  }

  .youtube-container .text {
    padding-right: calc(5 * var(--common-gutter));
  }

  .youtube-container .buttons .button {
    width: auto;
    display: block;
  }
}


.youtube-container .text {
  grid-area: text;
}

.youtube-container .video {
  grid-area: video;
}


.youtube-container .text > h1, .youtube-container .text > h2 {
  color: var(--white);
  --screen-dimension: 48px;
  background-image: url("~/assets/images/screen.png");
  background-size: var(--screen-dimension);
  padding-left: calc(var(--screen-dimension) + var(--common-gutter));
  background-repeat: no-repeat;
  /*font-size: 36px;*/
  line-height: var(--screen-dimension);
  margin-bottom: var(--common-gutter);

}

.youtube-container a.spring-site {
  background-image: url("~/assets/images/buttons/spring.png");
}

.youtube-container a.twitter {
  background-image: url("~/assets/images/buttons/twitter.png");
}

.youtube-container a.youtube {
  background-image: url("~/assets/images/buttons/youtube.png");
}

.youtube-container p {
  color: var(--gray-100);
  font-style: normal;
  font-weight: normal;

}



.youtube-container .text > h1 {
  font-size: 1.5em;
  font-weight: bold;
  padding-top: 0;
}

.youtube-container a {
  color: var(--white);
}
</style>
