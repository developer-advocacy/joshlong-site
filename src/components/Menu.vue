<template>
  <div class="logo">Josh Long</div>
  <div tabindex="1" @click="showMenu" class="hamburger-menu"></div>

  <div v-bind:class="{  'links' : true, 'menuOpen': this.hamburgerMenuOpen ,'menuClosed' : !this.hamburgerMenuOpen }">
    <a href="/">Home</a>
    <a href="/about.html">About</a>
    <a href="/#livelessons">Livelessons</a>
    <a href="/#books">Books</a>
    <a href="/#podcast">Podcast</a>
    <a href="/abstracts.html">Abstracts</a>
    <a href="/#appearances">Appearances</a>
    <a href="/#youtube">Spring Tips</a>

    <div>
      <!--
            don't delete this div! for some reason chrome renders these
            <a> elements as super small unless this div is here
      -->
    </div>
  </div>

  <div class="social-icons">
    <SocialIcons/>
  </div>

</template>
<script>
import SocialIcons from "@/components/SocialIcons";

export default {
  name: 'Menu',
  components: {SocialIcons},
  props: {},
  data: function () {
    return {
      hamburgerMenuOpen: false
    }
  },
  methods: {
    showMenu() {
      this.hamburgerMenuOpen = this.hamburgerMenuOpen !== true;
    }
  }
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

.menuClosed {
  display: none;
}

.menuOpen {
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
  /*display: none;*/
}

.menu > .links {
  text-align: center;

}

.menu > .links > a {
  margin: 0;
  padding: 0;
  display: block;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  font-size: larger;
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

  .menu > .links > a {
    display: inline;
    margin: 0;
    padding-right: 0.5em;
  }

  .menu > .links > a:hover {
    color: var(--green-600)
  }

  .menu > .links {
    grid-area: links;
    display: block;
  }

  .menu {
    position: fixed;
    width: 100%;
    grid-template-areas: "logo links social-icons";
    grid-template-columns: 150px  auto 100px;
  }
}

</style>
