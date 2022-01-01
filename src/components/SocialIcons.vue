<template>
  <div class="social-icons-container">
    <a class="overlay li" href="https://linkedin.com/in/joshlong"></a>
    <a class="overlay yt" href="https://bit.ly/spring-tips-playlist"></a>
    <a class="overlay twitter" href="https://twitter.com/starbuxman"></a>
  </div>
</template>
<script>
export default {
  name: 'SocialIcons',
  props: {},
  data: function () {
    return {}
  },
  methods: {}
}
</script>

<style>


@media screen and (min-width: 1000px) {

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
  }

  .social-icons-container img {
    border: 1px solid white;
    position: relative;
  }

  .overlay {
    height: var(--social-icons-height);

    background-image: url("~@/assets/images/social-icons/white.png");
  }

  .overlay:hover {

    background-image: url("~@/assets/images/social-icons/green.png");
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
}

</style>
