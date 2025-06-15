<template>
  <section
    :class="[
      'pt-medium pb-medium full-width content-grid',
      props.index % 2 === 0 ? '' : ' bg-accent-50 dark:bg-primary-700',
    ]"
  >
    <Suspense>
      <LazySliderComponent :images="props.zone.images" />
      <template #fallback>
        <div class="slider-skeleton">Loading images...</div>
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: ImageZone;
  index: number;
}>();
</script>

<style scoped>
.slider-skeleton {
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
