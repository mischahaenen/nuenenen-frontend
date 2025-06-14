<template>
  <figure class="slide" :class="{ active: isActive }" :aria-hidden="!isActive">
    <div class="image-container">
      <NuxtImg
        format="webp"
        provider="strapi"
        class="slide-image"
        :src="image.hash + image.ext"
        :alt="image.alternativeText || image.name"
        sizes="100vw sm:50vw md:400px"
        :tabindex="isActive ? 0 : -1"
        role="button"
        :aria-label="`${image.alternativeText || image.name} - Klicken für Vollbildmodus`"
        style="cursor: pointer"
        @click="$emit('open-fullscreen')"
        @keydown.enter="$emit('open-fullscreen')"
        @keydown.space="$emit('open-fullscreen')"
      />
    </div>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  image: Image;
  index: number;
  isActive: boolean;
}>();

defineEmits<{
  "open-fullscreen": [];
}>();
</script>
