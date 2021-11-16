<template>
  <Page>
    <Zone class="menu">
      <Menu></Menu>
    </Zone>
    <Zone class="go">
      You can dooo THIS!
    </Zone>
  </Page>
</template>

<script>
import Zone from "@/components/Zone";
import Page from "@/components/Page";
import Menu from "@/components/Menu";

export default {
  name: 'App',
  components: {
    Zone, Page, Menu
  }
}
</script>

<style>
.go {
  border: 1px solid orange;
}

</style>
