<template>

  <div class="social-icons"><SocialIcons/></div>
  <div class="name"> Josh Long</div>
  <div class="copyright">©{{ year }} Josh Long. All rights reserved.</div>

</template>
<script>
import SocialIcons from "@/components/SocialIcons";
export default {
  name: 'Footer',
  components: {SocialIcons},
  data() {
    return {year: new Date().getFullYear()   }
  }
}
</script>
<style>


.footer {
  color: var(--gray-100);
  padding-top: calc(2 * var(--page-top-pad));
  padding-bottom: calc(2 * var(--page-bottom-pad));
  background-color: var(--gray-900);
  display: grid;
  grid-template-areas:  "name"
                        "icons"
                        "copyright";
  grid-template-columns: auto;
  height: 200px;
}

.footer > .social-icons {
  grid-area: icons;
}


.footer > .name {
  grid-area: name;
  text-align: center;
  color: var(--gray-25);
}

.footer > .copyright {
  text-align: center;
  color: var(--gray-400);
  grid-area: copyright;
}

@media screen and (min-width: 1000px) {

  .footer > .copyright {
    text-align: right;
  }

  .footer > .social-icons {
    text-align: left;
  }

  .footer > .name {
    text-align: center;
    font-weight: bold;
  }

  .footer {
    grid-template-areas: "icons name copyright";
    grid-template-columns: 300px auto 300px;
  }

}
</style>