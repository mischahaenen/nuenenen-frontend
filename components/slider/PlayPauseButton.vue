<template>
  <button
    class="nav-button nav-button--play-pause"
    :aria-label="isActive ? 'Diashow pausieren' : 'Diashow starten'"
    :aria-pressed="isActive"
    @click="$emit('toggle')"
  >
    <!-- Pause Icon -->
    <svg
      v-if="isActive"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>

    <!-- Play Icon -->
    <svg
      v-else
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <polygon points="5,3 19,12 5,21"></polygon>
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  isActive: boolean;
}>();

defineEmits<{
  toggle: [];
}>();
</script>
