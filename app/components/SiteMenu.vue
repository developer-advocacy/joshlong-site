<template>
  <NuxtLink to="/" class="logo">Josh Long</NuxtLink>
  <button
type="button" class="hamburger-menu" :aria-expanded="hamburgerMenuOpen" aria-controls="site-links"
          aria-label="Menu" @click="hamburgerMenuOpen = !hamburgerMenuOpen"/>

  <nav id="site-links" aria-label="Site" :class="{'links': true, 'menuOpen': hamburgerMenuOpen, 'menuClosed': !hamburgerMenuOpen}">
    <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
    <div>
      <!--
            don't delete this div! for some reason chrome renders these
            <a> elements as super small unless this div is here
      -->
    </div>
  </nav>

  <div class="social-icons">
    <SocialIcons/>
  </div>
</template>

<script setup lang="ts">
const links = [
  {to: '/', label: 'Home'},
  {to: '/about', label: 'About'},
  {to: '/blog', label: 'Blog'},
  {to: '/livelessons', label: 'Livelessons'},
  {to: '/books', label: 'Books'},
  {to: '/podcast', label: 'Podcast'},
  {to: '/appearances', label: 'Appearances'},
  {to: '/videos', label: 'Youtube'},
  {to: '/abstracts', label: 'Abstracts'},
]

const hamburgerMenuOpen = ref(false)

// close the menu once a link in it has been followed.
const route = useRoute()
watch(() => route.fullPath, () => {
  hamburgerMenuOpen.value = false
})
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
  grid-template-rows: auto max-content;
  grid-template-areas:
                    "logo  hamburger  "
                    "links links ";
  margin-top: calc(-1 * var(--page-top-pad));
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
  margin: 0;
  border: 0;
  height: 80px;
  min-height: 80px;
  width: 80px;
  min-width: 80px;
  background-color: transparent;
  background-size: 80px 80px;
  background-repeat: no-repeat;
  background-image: url("~/assets/images/hamburger-menu.png");
  cursor: pointer;
}

.menu > .links {
  grid-area: links;
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
  text-decoration: none;
}

.menu > .social-icons {
  display: none;
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

  .menu > .links > a:hover, .menu > .links > a.router-link-exact-active {
    color: var(--green-600)
  }

  .menu > .links {
    grid-area: links;
    display: block;
  }

  .menu > .social-icons {
    display: block;
  }

  .menu {
    position: fixed;
    width: 100%;
    grid-template-areas: "logo links social-icons";
    grid-template-columns: 150px auto 100px;
  }
}
</style>
