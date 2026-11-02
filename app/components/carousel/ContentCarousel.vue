<template>
  <div class="content-showcase">
    <component :is="headingLevel">
      <slot name="title"/>
    </component>
    <slot name="description"/>
    <div v-if="active" class="content" :class="side === 'l' ? 'left' : 'right'">

      <div class="description">
        <h3>{{ active.title }}</h3>
        <div v-html="active.html"/>
        <p v-if="detailsPath" class="details"><NuxtLink :to="detailsPath">See them all</NuxtLink></p>
      </div>

      <div class="covers-container">
        <div ref="coversDiv" class="covers">
          <div class="cover left"><img :src="left!.imageUrl" :alt="left!.title" loading="lazy" @click="goLeft"></div>
          <div class="cover active"><img ref="activeImage" :src="active.imageUrl" :alt="active.title"></div>
          <div class="cover right"><img :src="right!.imageUrl" :alt="right!.title" loading="lazy" @click="goRight"></div>
        </div>
        <NavigationArrows
            :left-arrow-active="activeIndex !== 0"
            :right-arrow-active="activeIndex !== content.length - 1"
            @right="goRight"
            @left="goLeft"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  content: Content[]
  side?: 'l' | 'r'
  headingLevel?: 'h1' | 'h2'
  detailsPath?: string
}>(), {side: 'r', headingLevel: 'h2', detailsPath: undefined})

// the first item is rendered on the server, so its title, description, and cover are in the html.
const activeIndex = ref(0)
const at = (index: number) => props.content[(index + props.content.length) % props.content.length]
const active = computed(() => at(activeIndex.value))
const left = computed(() => at(activeIndex.value - 1))
const right = computed(() => at(activeIndex.value + 1))

const goLeft = () => (activeIndex.value = (activeIndex.value - 1 + props.content.length) % props.content.length)
const goRight = () => (activeIndex.value = (activeIndex.value + 1) % props.content.length)

// the covers aren't all the same shape. make room for the tallest one, so nothing jumps around as they change.
const coversDiv = ref<HTMLElement | null>(null)
const activeImage = ref<HTMLImageElement | null>(null)
let tallestRatio = 0

function resizeCovers() {
  if (!coversDiv.value || !activeImage.value || !tallestRatio) return
  const height = Math.floor(activeImage.value.clientWidth * tallestRatio)
  if (height > 0) coversDiv.value.style.height = `${height}px`
}

function ratioOf(url: string): Promise<number> {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => resolve(image.height / image.width)
    image.onerror = () => resolve(0)
    image.src = url
  })
}

onMounted(async () => {
  const ratios = await Promise.all(props.content.map(c => ratioOf(c.imageUrl)))
  tallestRatio = Math.max(0, ...ratios)
  window.addEventListener('resize', resizeCovers)
  resizeCovers()
})

onBeforeUnmount(() => window.removeEventListener('resize', resizeCovers))
</script>

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

.content {
  display: grid;
}

.content > .description {

  grid-area: description;
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


.content .covers > .cover.left > img, .content .covers > .cover.right > img {
  cursor: pointer;
}

.content .covers > .cover > img {
  height: auto;
}

.content > .description > .details a {
  color: var(--green-600);
}
</style>
