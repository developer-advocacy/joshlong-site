<template>
  <div class="social-icons-container">
    <a class="overlay li" :href="profiles.linkedin" rel="me" aria-label="Josh Long on LinkedIn" title="LinkedIn"/>
    <a class="overlay yt" :href="profiles.springTips" rel="me" aria-label="Spring Tips on YouTube" title="YouTube"/>
    <a class="overlay twitter" :href="profiles.twitter" rel="me" aria-label="Josh Long (@starbuxman) on X" title="X"/>
  </div>
</template>

<style>
/*
i think the right way to do this is to have three
divs each with the same background image, but with different
crop/clips/offsets, all in a row, in a grid layout
*/
.social-icons-container {
  display: grid;
  grid-template-areas: "yt twitter li";
  --social-icons-width: 33px;
  --social-icons-height: 21px;
  grid-template-columns: var(--social-icons-width) var(--social-icons-width) var(--social-icons-width);
  grid-template-rows: 30px;
  height: var(--social-icons-height);
  justify-content: center;
}

.overlay {
  height: var(--social-icons-height);
  background-image: url("~/assets/images/social-icons/white.png");
}

.overlay:hover, .overlay:focus-visible {
  background-image: url("~/assets/images/social-icons/green.png");
}

.overlay.yt {
  grid-area: yt;
  background-position-x: 0;
}

.overlay.twitter {
  grid-area: twitter;
  background-clip: border-box;
  background-position-x: -33px;
}

.li {
  grid-area: li;
  background-clip: border-box;
  background-position-x: -66px;
}

@media screen and (min-width: 1000px) {
  .social-icons-container {
    justify-content: start;
  }
}
</style>
