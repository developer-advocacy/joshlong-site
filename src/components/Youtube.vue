<template>
  <div class="text">
    <h2> Spring Tips </h2>
    <p>
      I run a screencast called <EM><STRONG>Spring Tips</STRONG></EM>. It's also on Twitter (<a
        href="https://twitter.com/SpringTipsLive">@SpringTipsLive</a>)
      Spring is the most popular application development framework for Java™. Millions
      of developers use Spring to build simple, truly portable, fast and flexible JVM-based systems and
      applications.
    </p>
    <div class="buttons">
      <button class="icon youtube">Learn on Youtube</button>
      <button class="icon twitter">Follow on Twitter</button>
      <button class="icon spring-site">Get Started Now</button>
      <!--            <button class="icon leanpub">Buy on Leanpub</button>-->
    </div>
  </div>

  <div class="video">
    <iframe src="https://www.youtube.com/embed/puIJ1Mn9_LE" title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
  </div>
</template>


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
}

.youtube-container .buttons button {
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

  .youtube-container .buttons button {
    width: auto;
    display: block;
  }
}


.youtube-container .text {
  grid-area: text;
}

.youtube-container .video {
  grid-area: video;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

.youtube-container .video iframe {
  border-radius: var(--common-gutter);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;

}

.youtube-container h2 {
  color: var(--white);
  --screen-dimension: 48px;
  background-image: url("~@/assets/images/screen.png");
  background-size: var(--screen-dimension);
  padding-left: calc(var(--screen-dimension) + var(--common-gutter));
  background-repeat: no-repeat;
  /*font-size: 36px;*/
  line-height: var(--screen-dimension);
  margin-bottom: var(--common-gutter);

}

.youtube-container button.spring-site {
  background-image: url("~@/assets/images/buttons/spring.png");
}

.youtube-container button.twitter {
  background-image: url("~@/assets/images/buttons/twitter.png");
}

.youtube-container button.youtube {
  background-image: url("~@/assets/images/buttons/youtube.png");
}

.youtube-container p {
  color: var(--gray-100);
  font-style: normal;
  font-weight: normal;

}

</style>



<script>
export default {
  name: 'Youtube',
  props: {}
}
</script>

