<template>


  <!-- todo: make this menu work and make the popup mobile menu
            based on JS, not just weird CSS pseudo elements
   -->
  <div class="logo">Josh Long</div>
  <div tabindex="1" class="hamburger-menu"></div>
  <div class="links">
<!--    <router-link to="/">Home</router-link>-->
    <a href="/">Home</a>
    <a href="/about.html">About</a>
<!--    <router-link to="/about.html#top">About</router-link>-->
    <!--
    <router-link :to="{ path: 'register', query: { plan: 'private' }}"
      >Register</router-link
    -->
    <a href="/#appearances">Appearances</a>
    <a href="/#livelessons">Livelessons</a>
    <a href="/#books">Books</a>
    <a href="/abstracts.html">Abstracts</a>
    <div>
      <!-- don't delete this div! for some reason chrome renders
      these <a> elements as super small unless this div is here
      -->
    </div>
  </div>
  <div class="social-icons">
    <img alt="social icons" :src="require('@/assets/images/social-icons.png')"/>
  </div>


</template>

<script>
export default {
  name: 'Menu',
  props: {}
}
</script>

<style>
.menu {


  z-index: 1000;
  padding-top: var(--page-top-pad);
  padding-bottom: var(--common-gutter);
  color: var(--white);
  background-color: var(--black);
  display: grid;
  grid-template-columns: auto var(--hamburger-menu-width);
  grid-template-rows: auto  max-content;
  grid-template-areas:
                    "logo  hamburger  "
                    "links links ";
  margin-top: calc(-1 * var(--page-top-pad));
  vertical-align: center;
  align-items: center;
}

.menu .social-icons {
  display: none;
}

.menu > .hamburger-menu:focus + .links {
  /* TODO this should be a javascript handler because any links clicked within don't work! */

  display: block;
}

.menu > .hamburger-menu {
  display: block;
  grid-area: hamburger;
  padding: 0;
  height: 80px;
  min-height: 80px;
  width: 80px;
  min-width: 80px;
  background-size: 80px 80px;
  background-repeat: no-repeat;
  background-image: url("~@/assets/images/hamburger-menu.png");
}

.menu > .links {
  grid-area: links;
  display: none;


}

.menu > .links {
  text-align: center;

}

.menu > .links > a {
  margin: 0;
  padding: 0;
  display: block;
  font-weight: 500;
  text-decoration: none;
}

.menu .logo {
  grid-area: logo;
  font-weight: 500;
  font-size: 7vw;
}

@media screen and (min-width: 1000px) {

  .menu .logo {
    font-size: x-large;
  }

  .menu .hamburger-menu {
    display: none;
  }

  .menu .social-icons {
    grid-area: social-icons;
    background: url("~@/assets/images/social-icons.png") no-repeat;
    background-size: 200px 20px;
    height: 20px;
    display: block;
    width: 200px;
  }

  .menu > .links > a {
    display: inline;
    margin: 0;
    padding-right: 0.5em;
  }

  .menu > .links {
    grid-area: links;
    display: block;
  }

  .menu {

    position: fixed;
    width: 100%;

    grid-template-areas: "logo links social-icons";
    grid-template-columns: 150px  auto 200px;
  }
}

</style>
