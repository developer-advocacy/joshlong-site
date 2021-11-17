<template>


  <h2>
    Listen to my Podcast
  </h2>
  <div class="podcast-description">
    I run a podcast called A Bootiful Podcast, a celebration of the heroes that drive the Spring and Java
    ecosystems. It's also on Twitter (<a href="https://twitter.com/bootifulpodcast">@BootifulPodcast</a>). Here are
    the episodes.
  </div>
  <div class="podcast-logo">
    <img alt="A Bootiful Podcast" src="~@/assets/images/bootiful-podcast-logo.png"/>
  </div>
  <div class="latest-episode-panel"></div>
  <div class="latest-episode-panel-content">
    <div class="image">
      <img alt="the latest guest needs no introduction.." :src="podcast.imageUrl"/>
    </div>
    <div class="prompt">Latest episode</div>
    <div class="synopsis">
      <h3> {{ podcast.title }} </h3>
      <div v-html="podcast.html"></div>
    </div>
    <div class="play"></div>
  </div>


</template>

<script>
export default {
  name: 'RecentPodcast',
  components: {},
  props: ['podcast'],
  setup() {
  }
}
</script>
<style>


/* PODCAST */
.latest-episode-panel-content .image {
  grid-area: image;
  align-content: center;
  alignment: center;
  text-align: center;
  vertical-align: center;
  padding: var(--common-gutter);
}

.latest-episode-panel-content .image img {
  --guest-image-dimension: 80px;
  width: var(--guest-image-dimension);
  height: var(--guest-image-dimension);
  clip-path: circle(calc(var(--guest-image-dimension) / 2));
}

.podcast > h3 {
  grid-area: listen;
  --microphone-size: 48px;
  background-image: url("~@/assets/images/microphone.png");
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
                "image prompt prompt"
                "image synopsis play ";
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
                    "listen "
                    "text "
                    "logo "
                    "panel";
}


.latest-episode-panel-content > .play {

  --play-icon-dimensions: 50px;
  background-image: url("~@/assets/images/play.png");
  background-repeat: no-repeat;
  background-size: var(--play-icon-dimensions);
  background-position: center;
  grid-area: play;
}

.latest-episode-panel-content > .synopsis {
  grid-area: synopsis;
  margin-bottom: calc(-1 * var(--common-gutter));
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

  :root {
    --guest-image-dimension: 200px;
  }

  .podcast {
    grid-template-areas:
                "listen logo"
                "text logo"
                "panel panel";
    grid-template-rows: auto auto   auto;
  }


}

</style>
