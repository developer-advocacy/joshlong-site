<template>
  <!-- links when there's somewhere to go (so crawlers can follow them), buttons when it's all on this page. -->
  <div class="arrows">
    <template v-if="newerHref !== undefined || olderHref !== undefined">
      <NuxtLink v-if="newerHref" :to="newerHref" rel="prev" class="arrow left active" aria-label="Newer"/>
      <span v-else class="arrow left"/>
      <NuxtLink v-if="olderHref" :to="olderHref" rel="next" class="arrow right active" aria-label="Older"/>
      <span v-else class="arrow right"/>
    </template>
    <template v-else>
      <button
type="button" :class="{'active': leftArrowActive}" class="arrow left" aria-label="Previous"
              @click.prevent="$emit('left')"/>
      <button
type="button" :class="{'active': rightArrowActive}" class="arrow right" aria-label="Next"
              @click.prevent="$emit('right')"/>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  leftArrowActive?: boolean
  rightArrowActive?: boolean
  newerHref?: string | null
  olderHref?: string | null
}>()
defineEmits<{ left: [], right: [] }>()
</script>

<style>
.arrows {
  text-align: center;
  margin-top: var(--common-gutter);
}

.arrows > .arrow {
  --arrow-dimension: 40px;
  display: inline-block;
  height: var(--arrow-dimension);
  width: var(--arrow-dimension);
  min-height: var(--arrow-dimension);
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  background-size: var(--arrow-dimension);
  background-repeat: no-repeat;
  cursor: pointer;
  vertical-align: middle;
}

.arrows > .arrow.left {
  background-image: url("~/assets/images/arrows/gray-l.png");
}

.arrows > .arrow.right {
  background-image: url("~/assets/images/arrows/gray-r.png");
}

.arrows > .arrow.left.active {
  background-image: url("~/assets/images/arrows/bw-l.png");
}

.arrows > .arrow.right.active {
  background-image: url("~/assets/images/arrows/bw-r.png");
}
</style>
