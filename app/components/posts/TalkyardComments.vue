<template>
  <!--
    the comments live on talkyard. its script only loads once the comments are about to scroll into
    view: most readers never get that far, and it shouldn't slow down the post for the rest.
    talkyard finds each post's discussion by its url, which hasn't changed in years.
  -->
  <div ref="container" class="comments">
    <div class="talkyard-comments" data-discussion-id="" style="margin-top: 45px;">
      <noscript>Please enable Javascript to view comments.</noscript>
      <p style="margin-top: 25px; opacity: 0.9; font-size: 96%">Comments powered by
        <a href="https://www.talkyard.io">Talkyard</a>.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
declare global {
  interface Window {
    talkyardServerUrl?: string
    talkyardReloadCommentsAndEditor?: () => void
    talkyardRemoveCommentsAndEditor?: () => void
  }
}

const container = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

function load() {
  if (window.talkyardReloadCommentsAndEditor) {
    // the script's already here, from an earlier post: point it at this one.
    window.talkyardReloadCommentsAndEditor()
    return
  }
  if (document.getElementById('talkyard-script')) return
  window.talkyardServerUrl = 'https://site-ypulnxougd.talkyard.net'
  const script = document.createElement('script')
  script.id = 'talkyard-script'
  script.async = true
  script.src = 'https://c1.ty-cdn.net/-/talkyard-comments.min.js'
  document.body.appendChild(script)
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      observer?.disconnect()
      load()
    }
  }, {rootMargin: '600px'})
  if (container.value) observer.observe(container.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.talkyardRemoveCommentsAndEditor?.()
})
</script>
