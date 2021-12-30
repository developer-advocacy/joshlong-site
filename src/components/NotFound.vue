<template>
  <Zone class="notfound">
    <img src="~@/assets/images/not-found.png"/>
  </Zone>
</template>

<script>
import Zone from "./Zone";

export default {
  name: 'NotFound',
  components: {Zone},
}
</script>

<style>
.notfound {
  background-color: black;
  padding-bottom: 0;
  margin-bottom: 0;
  padding-left: calc(-1 * var(--zone-padding));
  /*padding-top: var(--page-top-pad);*/
  /*padding-bottom: var(--common-gutter);*/
  /*border: 1px solid orange;*/
  /*padding: 0;*/
  /*margin: 0;*/
}

.notfound img {
  display: block;
  /*border: 1px solid red;*/
}
</style>
