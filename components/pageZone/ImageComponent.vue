<template>
  <section
    :class="[
      'pt-medium pb-medium',
      {
        'full-width content-grid bg-accent-50 dark:bg-primary-700':
          props.index % 2 === 1,
      },
    ]"
  >
    <TitleComponent :title="props.zone.Title" :index="index"></TitleComponent>
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
