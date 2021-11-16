<template>
  <Page title="JoshLong.com - Hi, Spring fans!">
    <Zone class="menu">
      <Menu></Menu>
    </Zone>
    <Zone class="hero">
       <Hero/>
    </Zone>
  </Page>
</template>

<script>
import Zone from "@/components/Zone";
import Page from "@/components/Page";
import Menu from "@/components/Menu";
import Hero from "@/components/Hero";

export default {
  name: 'App',
  components: {
    Hero,
    Zone, Page, Menu
  }
}
</script>

<style>


</style>
