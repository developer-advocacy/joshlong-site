import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // the api's html (posts, books, abstracts) is rendered as is. it's josh's own content.
    'vue/no-v-html': 'off',
    // the components were named before there was a rule about it: Zone, Hero, ...
    'vue/multi-word-component-names': 'off',
  },
})
