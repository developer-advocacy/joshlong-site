<template>


  <slot></slot>

</template>

<!--
information on using images in Vue.js apps:
https://newbedev.com/how-to-import-and-use-image-in-a-vue-single-file-component
-->

<script>
export default {
  props: ['title'],

  mounted() {
    document.title = this.title
  }
}
</script>

<style>
@import url("https://rsms.me/inter/inter.css");

:root {
  --social-icons-dimensions-height: 20px;
  --social-icons-dimensions-width: 200px;
  --common-gutter: 10px;
  --button-radius: calc(.8 * var(--common-gutter));
  --zone-padding: calc(2 * var(--page-right-pad));
  --josh-hero-image-height: 634px;
  --josh-hero-image-width: 500px;
  --gray-25: #FCFCFD;
  --gray-100: #F2F4F7;
  --gray-300: #D0D5DD;
  --gray-400: #98A2B3;
  --gray-500: #667085;
  --gray-800: #1D2939;
  --gray-900: #101828;
  --green-50: #ECFDF3;
  --green-600: #039855;
  --green-700: #027A48;
  --black: #000;
  --white: white;
  --light-green: #6CE9A6;
  --green-gradient: linear-gradient(#079052, #439792);
  --global-pad-multiplier: 1;
  --page-right-pad: calc(var(--common-gutter) * var(--global-pad-multiplier));
  --page-left-pad: calc(var(--common-gutter) * var(--global-pad-multiplier));
  --page-top-pad: calc(var(--common-gutter) * var(--global-pad-multiplier));
  --page-bottom-pad: calc(var(--common-gutter) * var(--global-pad-multiplier));
  --appearance-event-padding: .9em;
  --mobile-width: 1000px;
  --hamburger-menu-width: 80px;
  --icon-button-left-padding: calc(4 * var(--common-gutter));
}

*, *::before, *::after {
  box-sizing: border-box;
}

a {
  color: var(--white)
}

html {
  font-family: 'Inter', sans-serif;
}

h2 {
  line-height: normal;
  margin: 0;
}

body {
  margin: 0;
  background: var(--white);
  line-height: 1.5em;
  padding-left: var(--page-left-pad);
  padding-right: var(--page-left-pad);
  padding-top: var(--page-top-pad);
}


button {
  font-size: medium;
  font-weight: bold;
  background-color: var(--green-50);
  border-radius: var(--common-gutter);
  padding: calc(1.5 * var(--common-gutter));
  border-width: 0;
  color: var(--green-700);
  display: inline-block;
  margin-bottom: var(--common-gutter);
  width: 100%;
}

@media screen and (min-width: 1000px) {
  body {
    font-size: medium;
  }

  button {
    font-size: medium;
    width: auto;
  }

  :root {
    --global-pad-multiplier: 3;
  }
}

button.icon {
  padding-top: var(--common-gutter);
  background-repeat: no-repeat;
  background-position-y: var(--common-gutter);
  background-position-x: var(--common-gutter);
  background-size: 25px;
  padding-left: calc(5 * var(--common-gutter));
}

</style>
