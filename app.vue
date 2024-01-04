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
  ogImage: '/assets/img/nuenenen_logo.png',
  author: 'Mischa Haenen',
  contentSecurityPolicy: 'upgrade-insecure-requests',
})
useSeoMeta({
  title: 'Pfadi Nünenen - Entdecke Abenteuer und Gemeinschaft',
  ogTitle: 'Pfadi Nünenen - Entdecke Abenteuer und Gemeinschaft',
  description:
    'Willkommen auf der Webseite der Pfadi Nünenen. Hier findest du alle Informationen über unsere Pfadfindergruppe, kommende Veranstaltungen, Mitgliedschaft und mehr.',
  ogDescription:
    'Willkommen auf der Webseite der Pfadi Nünenen. Hier findest du alle Informationen über unsere Pfadfindergruppe, kommende Veranstaltungen, Mitgliedschaft und mehr.',
  ogImage: 'https://dev.pfadi-nuenenen.ch/img/nuenenen_logo.webp',
  author: 'Mischa Haenen',
  contentSecurityPolicy: 'upgrade-insecure-requests',
  ogUrl: 'https://dev.pfadi-nuenenen.ch',
  ogType: 'website',
  ogLocale: 'de_DE',
  ogSiteName: 'Pfadi Nünenen',
  keywords:
    'Pfadi, Nünenen, Nuenenen, Pink, Pfadfinder, Abenteuer, Gemeinschaft, Veranstaltungen',
})
</script>

//
