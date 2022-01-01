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
  /*text-align: center;*/
  /*border: 1px solid red ;*/
}

/*
.footer > .social-icons > img {
  width: var(--social-icons-dimensions-width);
  height: var(--social-icons-dimensions-height);
  align-self: center;
}
*/

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
  }

  .footer {
    grid-template-areas: "icons name copyright";
    grid-template-columns: 100px 20% 40%;
  }

}
</style>