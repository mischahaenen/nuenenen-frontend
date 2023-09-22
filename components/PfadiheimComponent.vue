<template>
  <div>
    <div class="two-column">
      <div>
        <TitleComponent
          :title="(zone as IFrame).Title"
          :index="index"
        ></TitleComponent>
        <RichTextComponent
          v-if="(zone as IFrame).Description"
          :content="(zone as IFrame).Description"
        />
      </div>
      <ImageSliderComponent
        v-if="props.zone.images.data"
        :images="props.zone.images.data"
      ></ImageSliderComponent>
    </div>

    <h3>Reserviere das Pfadiheim</h3>
    <iframe
      scrolling="no"
      class="pfadiheim-frame"
      :src="props.zone.iFrame"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number
  zone: IFrame
}>()
</script>

<style scoped>
.two-column {
  display: flex;
  gap: var(--space-extra-large);
  justify-content: center;
}
.pfadiheim-frame {
  width: 100%;
  height: 460px;
  overflow: hidden;
  border: none;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
}
@media screen and (max-width: 1080px) {
  .two-column {
    display: flex;
    flex-direction: column;
    gap: var(--space-medium);
  }
}
@media screen and (max-width: 600px) {
  .pfadiheim-frame {
    height: 260px;
  }
}
</style>
