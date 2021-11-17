<template>
  <Page title="JoshLong.com - Hi, Spring fans!">
    <Zone class="menu">
      <Menu></Menu>
    </Zone>
    <Zone class="hero">
      <Hero/>
    </Zone>
    <Zone class="appearances">
      <Appearances :appearances="appearances"/>
    </Zone>
  </Page>
</template>

<script>
import Zone from "@/components/Zone";
import Page from "@/components/Page";
import Menu from "@/components/Menu";
import Hero from "@/components/Hero";
import Appearances from "@/components/appearance/Appearances";
import {Appearance} from '@/components/appearance/appearance'

export default {
  name: 'App',

  setup() {
    const appearances = [
      new Appearance(new Date(), 'Taster Masterclass', `I'll be doing a masterclass taster talk on all things Spring, Kubernetes, and Microservices`),
      new Appearance(new Date(), `O'REILLY`, `I'll be doing a talk at the upcoming O'REILLY conference. Wait, what do you mean it doesn't exist? :-(`),
      new Appearance(new Date(), `Devoxx`, `I'll be presenting (virtually) at the upcoming Devoxx show!`)
    ]
    console.log('the appearances length is ' + appearances.length)
    return { appearances: appearances }
  },
  components: {
    Hero,
    Zone, Page, Menu, Appearances
  }
}
</script>

<style>


</style>
