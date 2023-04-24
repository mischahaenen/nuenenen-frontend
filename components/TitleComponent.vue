<template>
  <h2 v-if="props.index % 2 !== 0">
    {{ props.title }}
  </h2>
  <ColoredTitleComponent v-else :title="props.title" />
</template>

<script setup lang="ts">
const props = defineProps<{ title: string | undefined; index: number }>()
</script>
