<template>
  <nav class="pagination" role="tablist" aria-label="Bilder-Navigation">
    <button
      v-for="(image, index) in images"
      :key="`dot-${index}`"
      class="pagination-dot"
      :class="{ active: index === currentIndex }"
      :aria-label="`Zu Bild ${index + 1} von ${images?.length} wechseln`"
      :aria-selected="index === currentIndex"
      :aria-current="index === currentIndex ? 'true' : 'false'"
      role="tab"
      :tabindex="index === currentIndex ? 0 : -1"
      @click="$emit('go-to-slide', index)"
    />
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  images: Image[];
  currentIndex: number;
}>();

defineEmits<{
  "go-to-slide": [index: number];
}>();
</script>
