<template>
  <div>
    <div
      class="sr-only"
      aria-live="polite"
      aria-atomic="true"
      :aria-label="'Status der Bildergalerie'"
    >
      Bild {{ currentIndex + 1 }} von {{ total }} wird angezeigt.
      {{
        isAutoplayActive
          ? "Die Diashow läuft automatisch ab."
          : "Die Diashow ist pausiert."
      }}
      {{ currentImage?.alternativeText || currentImage?.name }}
    </div>

    <div class="sr-only">
      Verwenden Sie die Pfeiltasten, um zwischen den Bildern zu navigieren, Pos1 für das
      erste Bild, Ende für das letzte Bild. Klicken Sie auf ein Bild oder drücken Sie
      Enter, um den Vollbildmodus zu öffnen.
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentIndex: number;
  total: number;
  isAutoplayActive: boolean;
  currentImage?: Image;
}>();
</script>
