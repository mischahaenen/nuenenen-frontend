<template>
  <figure
    class="single-image"
    role="img"
    :aria-label="image.alternativeText || image.name"
  >
    <div class="image-container">
      <NuxtImg
        class="slide-image"
        format="webp"
        provider="strapi"
        :src="image.hash + image.ext"
        :alt="image.alternativeText || image.name"
        sizes="100vw sm:50vw md:400px"
        role="button"
        :aria-label="`${
          image.alternativeText || image.name
        } - Klicken für Vollbildmodus`"
        style="cursor: pointer"
        tabindex="0"
        @click="$emit('open-fullscreen')"
        @keydown.enter="$emit('open-fullscreen')"
        @keydown.space="$emit('open-fullscreen')"
      />
    </div>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  image: Image
}>()

defineEmits<{
  'open-fullscreen': []
}>()
</script>

<style scoped lang="scss">
.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
