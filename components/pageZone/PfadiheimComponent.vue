<template>
  <section
    :class="[
      'full-width content-grid pt-medium',
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
    <h3 v-if="zone.images.data">Impressionen</h3>
    <div class="full-width-image">
      <ImageSliderComponent :images="zone.images.data"></ImageSliderComponent>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number
  zone: IFrame
}>()
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

@media screen and (max-width: 600px) {
  .iframe-content {
    height: 260px;
  }
}
</style>
