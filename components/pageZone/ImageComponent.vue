<template>
  <section
    :class="[
      'pt-medium pb-medium full-width content-grid',
      props.index % 2 === 0 ? '' : ' bg-accent-50 dark:bg-primary-700',
    ]"
  >
    <SliderComponent :images="props.zone.images" />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: ImageZone;
  index: number;
}>();
</script>
