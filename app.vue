<template>
  <div>
    <BaseHeader />
    <main>
      <NuxtPage />
    </main>
    <BaseFooter />
  </div>
</template>
<script lang="ts" setup>
// TODO: Add favicon
useHead({
  title: 'Pfadi Nünenen',
  htmlAttrs: {
    lang: 'de',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Official Website der Pfadi Nünenen',
    },
    { name: 'author', content: 'Mischa Haenen' },
    { name: 'format-detection', content: 'telephone=no' },
  ],
})
</script>
