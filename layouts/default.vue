<template>
  <div>
    <BaseHeader />
    <slot />
    <BaseFooter />
    <CookieConsent />
    <SpeedInsights />
  </div>
</template>

<script lang="ts" setup>
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>
