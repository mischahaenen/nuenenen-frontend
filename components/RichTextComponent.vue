<template>
  <div :class="{ preview: props.isPreview }">
    <VNode />
  </div>
</template>

<script lang="ts" setup>
import { StrapiBlocks, type BlocksContent } from 'vue-strapi-blocks-renderer'

const props = defineProps<{
  content: BlocksContent
  isPreview?: boolean
  previewLines?: number
}>()

const displayedContent = computed((): BlocksContent => {
  if (!props.content) return []

  if (props.isPreview && props.previewLines) {
    return props.content.slice(0, props.previewLines)
  }

  return props.content
})

const VNode = computed(() => {
  return StrapiBlocks({ content: displayedContent.value })
})
</script>

<style scoped lang="scss">
.preview {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: v-bind("props.previewLines || 3");
  -webkit-box-orient: vertical;
}
</style>
