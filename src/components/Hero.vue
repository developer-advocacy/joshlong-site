<template>

  <div class="text">
    <div class="name">Josh Long</div>
    <div class="description ">
      A Spring Developer Advocate, Java Champion,
      Kotlin Google Developer Expert, author of numerous books,
      best-selling video trainer, open-source contributor,
      podcaster and YouTuber: hi, Spring fans! 👋
    </div>
    <button>
      Get to know me
    </button>
  </div>
  <div class="image">
    <img alt="Hi, Spring fans! I'm Josh Long" src="~@/assets/images/josh-hero-image.png"/>
  </div>

</template>

<script>
export default {
  name: 'Hero',
  props: {}
}
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

.hero > .text > button {
  background-color: var(--black);
  border: 1px solid var(--light-green);
  margin-top: var(--common-gutter);
  color: var(--light-green);
}

.hero > .text {
  grid-area: text;
  padding-top: calc(4 * var(--page-top-pad));
}

.hero > .image {
  text-align: center;
  padding: 0;
  margin: 0;
  margin-top: var(--common-gutter);
  line-height: 0;
  font-size: 0;
}

.hero > .image > img {
  width: 100%;
  padding: 0;
  margin: 0;
}

.hero > .text > .name {
  font-size: xxx-large;
  line-height: 2em;
  display: none;
}

@media screen and (min-width: 1000px) {

  .hero > .text > button {
    width: auto;
  }

  .hero {
    display: grid;
    grid-template-areas: "text image";
    grid-template-columns: auto 500px;
    padding-top: var(--page-top-pad);
  }

  .hero > .text > .name {
    display: block;
  }
}

</style>
