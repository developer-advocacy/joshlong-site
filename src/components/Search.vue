<template>
  <div class="search">


    <form>
      <div class="prompt">
        <h2> Recent Posts </h2>
      </div>
      <div class="fields">
        <label>Query </label> <input required type="text"/>
      </div>
      <div class="buttons">
        <button> Search!</button>
      </div>
    </form>


  </div>

</template>

<script>
export default {
  props: ['title'],

  mounted() {
  }
}
</script>

<style>
</style>
