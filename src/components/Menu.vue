<template>


  <div class="logo">Josh Long</div>
  <div tabindex="1" class="hamburger-menu"></div>
  <div class="links">

    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Appearances</a>
    <a href="#">Blog</a>
    <a href="#">Abstract</a>
    <a href="#">Livelessons</a>
    <a href="#">Books</a>
    <a href="#">Contact</a>
    <div>
      <!-- don't delete this div! for some reason chrome renders
      these <a> elements as super small unless this div is here
      -->
    </div>
  </div>
  <div class="social-icons">
    <img alt="social icons" src="assets/images/social-icons.png"/>
  </div>


</template>

<script>
export default {
  name: 'Menu',
  props: {

  }
}
</script>

<style scoped>

</style>
