<template>
  <section class="full-width-image image-section">
    <ImageSliderComponent :images="props.zone.images" />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: ImageZone;
  index: number;
}>();
</script>
