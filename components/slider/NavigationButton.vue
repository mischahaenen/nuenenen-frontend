<template>
  <button
    class="nav-button"
    :class="`nav-button--${direction}`"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    <!-- Previous Arrow -->
    <svg
      v-if="direction === 'prev'"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <polyline points="15,18 9,12 15,6"></polyline>
    </svg>

    <!-- Next Arrow -->
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
      <polyline points="9,18 15,12 9,6"></polyline>
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  direction: "prev" | "next";
  ariaLabel: string;
}>();

defineEmits<{
  click: [];
}>();
</script>
