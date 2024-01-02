<template>
  <section
    v-if="props.zone.files"
    :class="[
      'pt-medium pb-medium',
      {
        'full-width content-grid bg-accent-50 dark:bg-primary-700':
          props.index % 2 === 1,
      },
    ]"
  >
    <TitleComponent
      :title="props.zone.Title"
      :index="props.index"
    ></TitleComponent>
    <a
      v-for="file in props.zone.files.data"
      :key="file.id"
      :href="file.attributes.url"
      download=""
      >Download {{ file.attributes.name }}</a
    >
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: Document
  index: number
}>()
</script>
