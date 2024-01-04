<template>
  <section class="full-width-image image-section">
    <ImageSliderComponent :images="props.zone.images.data" />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  zone: ImageZone
  index: number
}>()
</script>
