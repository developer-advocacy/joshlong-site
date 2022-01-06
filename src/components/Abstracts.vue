<template>

  <Zone class="abstracts">
    <div v-html="html"></div>
  </Zone>
</template>
<style>
.abstracts a {
  color: var(--gray-400);
}

.abstracts {
  padding-top: calc(var(--page-top-pad) * 2);
}
</style>
<script>
import Zone from "./Zone";
import {ContentService} from "@/content-service";

export default {
  name: 'Abstracts',
  components: {Zone},
  props: {},

  async created() {
    const cs = new ContentService()
    this.html = await cs.abstracts()
  },
  data() {
    return {
      html: ''
    }
  }
}
</script>