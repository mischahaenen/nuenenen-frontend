<template>
  <div>
    <Hero :title="title" :content="pages" />
    <ContentGrid :title="title" :content="pages" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MitmachenPage',
  data() {
    return {
      pages: [],
      title: 'About',
    }
  },
  async mounted() {
    const page = await getPage('Mitmachen');
    this.page = page.data
    console.log(page);
    
    
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  --color-base: hsl(0deg 0% 100%);
  --color-base-1: hsl(0deg 0% 95%);
  --color-contrast: hsl(0deg 0% 0%);
  --color-contrast-1: hsl(0deg 0% 17%);

  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  font-size: 16px;
  background: var(--color-base);
  color: var(--color-contrast);
  transition: background 0.5s ease;
}

body.dark {
  --color-base: hsl(0deg 0% 0%);
  --color-base-1: hsl(0deg 0% 17%);
  --color-contrast: hsl(0deg 0% 100%);
  --color-contrast-1: hsl(0deg 0% 95%);
}

h1 {
  letter-spacing: -0.01em;
}

.layout {
  padding: 0;
}

.layout.sticky-header {
  padding: 6rem 0 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (min-width: 860px) {
  .container {
    padding: 0 6rem;
  }
}

a {
  color: inherit;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
</style>
