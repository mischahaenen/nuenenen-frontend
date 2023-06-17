<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  title: 'Pfadi Nünenen',
  htmlAttrs: {
    lang: 'de',
  },
})
useSeoMeta({
  title: 'Pfadi Nünenen',
  ogTitle: 'Pfadi Nünenen',
  description:
    'Willkommen auf der neuen Webseite der Pfadi Nünenen. Hier finden Sie alle Informationen über unsere Pfadfindergruppe, kommende Veranstaltungen, Mitgliedschaft und mehr.',
  ogDescription:
    'Willkommen auf der neuen Webseite der Pfadi Nünenen. Hier finden Sie alle Informationen über unsere Pfadfindergruppe, kommende Veranstaltungen, Mitgliedschaft und mehr.',
  ogImage: './assets/img/nuenenen_logo.png',
  author: 'Mischa Haenen',
})
</script>
