<template>
  <section
    :class="[
      'full-width content-grid pt-medium pb-medium',
      {
        'bg-accent-50 dark:bg-primary-700': props.index % 2 === 1,
      },
    ]"
  >
    <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
    <RichTextComponent :content="zone.Description"></RichTextComponent>
    <h3>Reserviere das Pfadiheim</h3>
    <iframe
      class="iframe-content"
      :src="props.zone.iFrame"
      :title="props.zone.Title"
    ></iframe>
    <h3 v-if="zone.images">Impressionen</h3>
    <Suspense>
      <LazySliderComponent :images="zone.images" />
      <template #fallback>
        <div class="slider-skeleton">Loading images...</div>
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number;
  zone: IFrame;
}>();
</script>

<style scoped>
.iframe-content {
  width: 100%;
  height: 460px;
  overflow: clip visible;
  border: none;
  background-color: var(--color-white);
  border-radius: 10px;
}

.slider-skeleton {
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media screen and (max-width: 600px) {
  .iframe-content {
    height: 260px;
  }
}
</style>
