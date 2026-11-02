<template>
  <div>
    <a class="skip-link" href="#main">Skip to the content</a>
    <Zone class="menu">
      <SiteMenu/>
    </Zone>
    <main id="main">
      <slot/>
    </main>
    <Zone class="footer">
      <SiteFooter/>
    </Zone>
  </div>
</template>
