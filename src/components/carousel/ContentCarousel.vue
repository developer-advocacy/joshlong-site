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

.content a {
  color: var(--green-600);
  font-weight: bold;
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
    /*grid-auto-flow: column;*/
  }

  .content-showcase > p {
    padding-right: calc(var(--common-gutter) * 20);
    padding-left: calc(var(--common-gutter) * 20);
  }
}

.content .covers-container {
  grid-area: covers;

}


.content .covers {
  /*grid-area: covers;*/
  display: grid;
  grid-template-areas: ". l active r .";
  grid-template-columns: auto  calc(var(--cover-width) / 2) var(--active-cover-width) calc(var(--cover-width) / 2) auto;
  align-items: center;
  justify-items: center;
}


.content {
  grid-template-areas:
            "covers "
            "description ";
}

.content .buttons {
  text-align: center;
}


@media screen and (min-width: 1000px) {

  :root {
    --three-covers-width: calc(calc(var(--cover-width) / 2) + var(--active-cover-width) + calc(var(--cover-width) / 2));
  }

  .content .buttons {
    text-align: left;
  }

  .content.right {
    margin-right: calc(-1 * var(--zone-padding));
    grid-template-columns: auto var(--three-covers-width);
    grid-template-areas: "description covers ";
  }

  .content.left {
    margin-left: calc(-1 * var(--zone-padding));
    grid-template-columns: var(--three-covers-width) auto;
    grid-template-areas:  " covers description ";
  }
}


</style>
<template>
  <div class="content-showcase">
    <h2>
      <slot name="title"></slot>
    </h2>
    <slot name="description"></slot>
    <div class="content" :class="orientationClass">

      <div class="description">
        <h3> {{ contentTitle }} </h3>
        <div v-html="contentDescription"></div>
      </div>

      <div class="covers-container">
        <div ref="covers-div" class="covers">
          <div class="cover left"><img :src="leftUrl" alt="the left title"/></div>
          <div ref="active-image" class="cover active"><img alt="the active title" :src="activeUrl"/></div>
          <div class="cover right "><img alt="the right title" :src="rightUrl"/></div>
        </div>
        <div>
          <div class="arrows">
            <div @click="left()" :class="{'active': leftArrowActive }" class="arrow    left"></div>
            <div @click="right()" :class="{'active': rightArrowActive }" class="arrow right"></div>
          </div>
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
  props: ['content', 'side'],
  data() {
    return {
      orientationClass: {
        'right': true,
        'left': false,
      },
      tallestCover: null,
      contentTitle: '',
      contentDescription: '',
      leftArrowActive: false,
      rightArrowActive: false,
      sized: false,
      activeIndex: 0,
      leftIndex: 0,
      rightIndex: 0,
      activeUrl: '',
      leftUrl: '',
      rightUrl: ''
    }
  },
  methods: {
    resizeCovers() {
      const ai = this.$refs['active-image']
      if (ai == null) return;
      const cw = ai.clientWidth
      const nh = cw * this.tallestCover.ratio
      const cd = this.$refs['covers-div']

      function isWindowDirty(h) {
        let nh = Math.floor(h)
        if (nh === 0) {
          return false
        }
        let existingHeight = 0
        if (cd.style.height && (typeof cd.style.height === 'string') && cd.style.height !== '') {
          existingHeight = Math.floor(parseInt(cd.style.height))
        }
        return existingHeight !== nh;
      }

      if (isWindowDirty(nh)) {
        cd.style.height = nh + 'px'
      }
    },
    refresh() {
      this.leftIndex = goLeft(this.activeIndex, this.content)
      this.rightIndex = goRight(this.activeIndex, this.content)
      this.leftUrl = this.content [this.leftIndex].imageUrl
      this.rightUrl = this.content [this.rightIndex].imageUrl
      this.activeUrl = this.content [this.activeIndex].imageUrl
      this.contentDescription = this.content[this.activeIndex].html
      this.contentTitle = this.content[this.activeIndex].title
      this.leftArrowActive = this.activeIndex !== 0;
      this.rightArrowActive = this.activeIndex !== (this.content.length - 1);

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

    // todo make the content heights of the descriptions permanently set
    // todo to whatever the largest body of text sort of like we did for the cover div
    // todo otherwise u get reflow in the mobile clients or in vertical orientation
    // todo where the covers are above the text, things below the text jump around

    if (this.side !== null && (typeof this.side) === 'string') {
      const l = this.side.toLowerCase() === 'l'
      const r = this.side.toLowerCase() === 'r'
      this.orientationClass = {'left': l, 'right': r}
    }

    const imageUrls = this.content
        .map(i => i.imageUrl)
        .map((url) => {
          const io = new Image()
          return createPromiseFromDomEvent(io, 'load', () => io.src = url);
        })

    const results = (await Promise.all(imageUrls))
        .map(r => {
          const ratio = ((1.0 * r.height) / (r.width * 1.0))
          return {ratio: ratio, src: r.src}
        })
    results.sort((a, b) => a.ratio - b.ratio)
    results.reverse()
    this.tallestCover = results.map(i => i) [0];
    window.addEventListener('resize', () => {
      this.sized = false;
      this.resizeCovers()
    })
    this.refresh()
    this.resizeCovers()
  }
}
</script>