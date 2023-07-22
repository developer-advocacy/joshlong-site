<template>

  <Zone class="abstracts">
    <h1> Abstracts </h1>
    <div v-html="html"></div>
  </Zone>
</template>
<style>
.abstracts a {
  color: var(--gray-400);
}


</style>
<script>
import Zone from "./Zone";
import {ContentService} from "@/core";

export default {
  name: 'Abstracts',
  components: {Zone},
  props: {},

  async created() {
    const cs = new ContentService()
    this.html = await cs.abstracts()
    console.log('loaded the html for the abstracts...')
  },
  data() {
    return {
      html: ''
    }
  }
}
</script>