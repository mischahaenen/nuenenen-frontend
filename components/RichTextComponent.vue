<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    :class="{ preview: props.isPreview }"
    v-html="$mdRenderer.render(markdown)"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  content?: string
  isPreview?: boolean
  previewLines?: number
}>()

const markdown = computed(() => {
  if (!props.content) return ''

  if (props.isPreview) {
    // Split the content into lines and take the specified number of lines for the preview
    const lines = props.content.split('\n').slice(0, props.previewLines || 3)
    // Join the lines back into a string and render
    return lines.join('\n')
  } else {
    // Render the full content
    return props.content
  }
})
</script>
<style scoped lang="scss">
.preview :deep(p) {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: v-bind('props.previewLines || 3');
  -webkit-box-orient: vertical;
}

.rich-text {
  display: block;
}
</style>
