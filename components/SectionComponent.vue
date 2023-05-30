<template>
  <div class="container">
    <TitleComponent
      :title="props.zone.Title"
      :index="props.index"
    ></TitleComponent>
    <RichTextComponent
      v-if="props.zone.Description"
      :content="props.zone.Description"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: IPageZone
  index: number
}>()
</script>
