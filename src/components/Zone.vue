<template>

  <div class="zone">
    <!--
      important: don't add more than one root to
                 this component: the class bindings
                 on this component get set on the root
                 element in the component, adding to .zone here
      -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Zone',
  props: {}
}
</script>

<style>
.zone {

  padding-left: var(--zone-padding);
  padding-right: var(--zone-padding);

  margin-left: calc(-1 * var(--page-left-pad));
  margin-right: calc(-1 * var(--page-right-pad));

}

.zone h2 {
  margin-top: calc(5 * var(--common-gutter));
}

</style>
