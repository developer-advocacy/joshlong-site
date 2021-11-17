<style>
/* CONTENT SHOWCASES CORE */
:root {
  --cover-width: 100px;
  --active-cover-width: 150px;
}

.content-showcase {
  padding-top: var(--page-top-pad);
}

.content-showcase > p {
  text-align: center;
  color: #667085;
}

.content-showcase > h2 {
  color: var(--gray-900);
  font-style: normal;
  font-weight: bold;
  text-align: center;
  letter-spacing: -0.02em;
}

.arrows {
  text-align: center;
  grid-area: arrows;
  margin-top: var(--common-gutter);
}

.arrows > .arrow.left {
  background-image: url("~@/assets/images/arrows/gray-l.png");
  display: inline-block;
}

.arrows > .arrow.right {
  display: inline-block;
  background-image: url("~@/assets/images/arrows/gray-r.png");
}

.arrows > .arrow.left.active {
  background-image: url("~@/assets/images/arrows/bw-l.png");
}

.arrows > .arrow.right.active {
  background-image: url("~@/assets/images/arrows/bw-r.png");
}

.arrows > .arrow {
  --arrow-dimension: 40px;
  height: var(--arrow-dimension);
  width: var(--arrow-dimension);
  background-size: var(--arrow-dimension);
  background-repeat: no-repeat;
}

.content {
  display: grid;
}

.content > .description {
  grid-area: description;
  alignment: center;
  text-align: center;
  display: inline-block;
}

.content > .description > h3 {
  font-style: normal;
  font-weight: 600;
  color: var(--gray-900);
}

.content > .description > p {
  font-style: normal;
  font-weight: normal;
  color: var(--gray-500);
}


.content .covers > div.cover.right {
  overflow: hidden;
  grid-area: r;
  width: calc(var(--cover-width) / 2);
}


.content .covers > div.cover.right > img {
  clip-path: inset(0px calc(var(--cover-width) / 2) 00px 0);
  width: var(--cover-width);
}

.content .covers > div.cover.left {
  overflow: hidden;
  grid-area: l;
  width: calc(var(--cover-width) / 2);
}

.content .covers > div.cover.left > img {
  width: var(--cover-width);
  left: calc(-1 * calc(var(--cover-width) / 2));
  display: inline-block;
  position: relative;
}

.content .covers > div.cover.active {
  grid-area: active;
  width: var(--active-cover-width);
  filter: drop-shadow(calc(var(--common-gutter) / 2) calc(var(--common-gutter) / 2) calc(var(--common-gutter) / 2) var(--gray-300));
}

.content .covers > div.cover.active > img {
  opacity: 1;
  width: var(--active-cover-width);
  border: 4px solid black;
  border-radius: var(--common-gutter);
}

.content .covers > .cover > img {
  opacity: 0.5;
  width: var(--cover-width);
}

@media screen and (min-width: 1000px) {
  .content .description {
    text-align: left;
    padding: calc(5 * var(--common-gutter));
  }

  :root {
    --cover-width: 300px;
    --active-cover-width: 342px;
  }

  .content .covers {
    grid-auto-flow: column;
  }

  .content-showcase > p {
    padding-right: calc(var(--common-gutter) * 20);
    padding-left: calc(var(--common-gutter) * 20);
  }
}

.content > .covers {
  grid-area: covers;
  display: grid;
  grid-template-areas: ". l active r .";
  grid-template-columns: auto  calc(var(--cover-width) / 2) var(--active-cover-width) calc(var(--cover-width) / 2) auto;
  align-items: center;
  justify-items: center;
}

.zone h2 {
  margin-top: calc(5 * var(--common-gutter));
}


/*BOOKS*/

.content {
  grid-template-areas:
            "covers "
            "arrows "
            "description ";
}


@media screen and (min-width: 1000px) {

  .content {
    margin-right: calc(-1 * var(--zone-padding));
  }

  .content {
    --width: calc(calc(var(--cover-width) / 2) + var(--active-cover-width) + calc(var(--cover-width) / 2));
    grid-template-columns: auto var(--width);
    margin-right: calc(-1 * var(--zone-padding));
    grid-template-areas:
            "description covers "
            "description arrows ";
  }

  .covers {
  }
}

</style>
<template>
  <div class="content-showcase">
    <h2>
      <slot name="title"></slot>
    </h2>
    <slot name="description"></slot>
    <div class="content">
      <div class="description">
        <h3>
          {{ contentTitle }}
        </h3>
        <div v-html="contentDescription"></div>
      </div>

      <div class="covers">
        <div class="cover left"><img :src="leftUrl" alt="the left title"/></div>
        <div class="cover active"><img alt="the active title" :src="activeUrl"/></div>
        <div class="cover right "><img alt="the right title" :src="rightUrl"/></div>
      </div>
      <div>
        <div class="arrows">
          <div @click="left()" class="arrow left"></div>
          <div @click="right()" class="arrow active right"></div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

function goLeft(cs, content) {
  return (cs === 0) ? content.length - 1 : cs - 1
}

function goRight(cs, content) {
  return (cs === (content.length - 1)) ? 0 : cs + 1
}

function createPromiseFromDomEvent(eventTarget, eventName, run) {
  return new Promise((resolve, reject) => {
        const handleEvent = () => {
          eventTarget.removeEventListener(eventName, handleEvent);
          // console.log('handling the event for ' + eventName + '.')
          resolve(eventTarget);
        };

        eventTarget.addEventListener(eventName, handleEvent);

        try {
          if (run) {
            run();
          }
        } catch (err) {
          reject(err);
        }
      }
  );
}

export default {
  name: 'ContentCarousel',
  components: {},
  props: ['content'],
  data() {
    return {
      contentTitle: '',
      contentDescription: '',
      activeIndex: 0, leftIndex: 0, rightIndex: 0, activeUrl: '', leftUrl: '', rightUrl: ''
    }
  },
  methods: {
    refresh() {
      this.leftIndex = goLeft(this.activeIndex, this.content)
      this.rightIndex = goRight(this.activeIndex, this.content)
      this.leftUrl = this.content [this.leftIndex].imageUrl
      this.rightUrl = this.content [this.rightIndex].imageUrl
      this.activeUrl = this.content [this.activeIndex].imageUrl
      this.contentDescription = this.content[this.activeIndex].html
      this.contentTitle = this.content[this.activeIndex].title
      console.log('left: ' + this.leftIndex + '; active: ' + this.activeIndex + '; right: ' + this.rightIndex)
    },
    right() {
      this.activeIndex = goRight(this.activeIndex, this.content)
      this.refresh()
    },
    left() {
      this.activeIndex = goLeft(this.activeIndex, this.content)
      this.refresh()
    },
  },

  async mounted() {

    // basically the div element containing the cover images
    // tends to bounce around a lot if the cover images are not
    // of uniform size so ive got an idea: what if we loaded the
    // images in memory, note the dimensions, then use that to
    // compute the largest image of the lot. then, with that,
    // we set the dive height to be whatever the scaled down
    // version of the height of that image is


    /*

    class ImageContext {

      constructor(url, img) {
        this.image = img
        this.url = url
      }

      ready() {
        this.w = this.image.width
        this.h = this.image.height
      }
    }

    function buildImageFor(url) {
      const imageObject = new Image();
      const ctx = new ImageContext(url, imageObject)
      imageObject.addEventListener('load', () => {
        console.log('loaded the bytes for ' + url + ' with w ' + imageObject.width + ' and ' + imageObject.height)
        ctx.h = imageObject.height
        ctx.w = imageObject.width
        ctx.ready()
      })
      imageObject.src = url
      return ctx
    }

        const imageUrls = this.content
            .map(c => c.imageUrl)
            .map(url => buildImageFor(url))
      */

    function loadImage(url) {
      const io = new Image()
      return createPromiseFromDomEvent(io, 'load', () => io.src = url);
    }

    const imageUrls = this.content
        .map(i => i.imageUrl)
        .map(loadImage)

    const results = (await Promise.all(imageUrls))
        .map(r => {
          const ratio = ((1.0 * r.height) / (r.width * 1.0))
          console.log('the image URL is ' + r.src + ' and the ratio is ' + ratio)
          return {ratio: ratio, src: r.src}
        })

    results.sort((a, b) => a.ratio - b.ratio);
    // results.sort((a, b) => a.height - b.height);
    results.reverse();


    console.log('the results', results.map(i => i) [0])


    this.refresh()
  }
}
</script>