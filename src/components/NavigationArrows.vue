<style>

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
</style>
<template>

  <div class="arrows">
    <div  @click.prevent="$emit('left')"   :class="{'active': leftArrowActive }"   class="arrow left"></div>
    <div  @click.prevent="$emit('right')"  :class="{'active': rightArrowActive }"  class="arrow right"></div>
  </div>

</template>
<script>
export default {
  name: 'NavigationArrows',
  components: {},
  props: ['leftArrowActive', 'rightArrowActive'],
  data() {
    return {}
  },
  methods: {}
}
</script>