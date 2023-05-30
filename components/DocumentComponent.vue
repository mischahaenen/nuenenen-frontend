<template>
  <div class="container">
    <TitleComponent
      :title="props.zone.Title"
      :index="props.index"
    ></TitleComponent>
    <a
      v-for="file in props.zone.files.data"
      :key="file.id"
      :href="useStrapiUrl() + file.attributes.url"
      download=""
      >Download {{ file.attributes.name }}</a
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: IPageZone
  index: number
}>()
</script>
