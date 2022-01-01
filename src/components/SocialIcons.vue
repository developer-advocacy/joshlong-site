<template>
  <div class="social-icons-container">

    <!--    <img alt="social icons " class="white" :src="require('@/assets/images/social-icons/white.png')"/>-->
    <div class="overlay li"></div>
    <div class="overlay yt"></div>
    <div class="overlay twitter"></div>
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
    /*width: var(--social-icons-width);*/
    /*background-size: var(--social-icons-width) var(--social-icons-height);*/
    /*background-repeat: no-repeat;*/
  }

  .social-icons-container img {
    border: 1px solid white;
    position: relative;
  }


  .overlay {
    height: var(--social-icons-height);
    top: 0;
    left: 0;
    z-index: 100;
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

  /*
    .social-icons-container > img {
      z-index: 10;
      grid-area: icons;
      height: var(--social-icons-height);
      width: var(--social-icons-width);
      top: 0;
      left: 0;
      display: block;
      background-color: orange;
    }*/
  /*


  .social-icons-container > .social-icons-color-multiplier {
    z-index: 2;
    grid-area: icons;
    height: var(--social-icons-height);
    width: var(--social-icons-width);
    display: block;
    top: 0;
    left: 0;
    background-color: red;
    background-blend-mode: color-burn;



  }
  */

}

</style>
