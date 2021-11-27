<template>

  <!--
    https://www.digitalocean.com/community/tutorials/how-to-add-v-model-support-to-custom-vue-js-components
  -->

  <div class="search">
    <form @submit.prevent="search ">
      <div class="prompt">
        <h2> Recent Posts </h2>
      </div>
      <div class="fields">
        <label>Query </label>
        <input @input.prevent="search" v-model="query" required type="text"/>
      </div>
      <div class="buttons">
        <button> Search!</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {

  /*
   * You need to setup a property called `modelValue` and
   * emit an event called `update:modelValue` to make a
   * component work correctly with v-model on the outside.
   *
   * The documentation is sparse, but I learned how
   * by <a href = "https://v3.vuejs.org/guide/migration/v-model.html#introduction">
   * checking out the migration guide</a>.
   *
   */
  prop: ['modelValue'],
  methods: {

    search() {
      this.$emit('update:modelValue', this.query);
    },
  },
  data() {
    return {
      query: this.query
    }
  }
}
</script>

<style>
</style>
