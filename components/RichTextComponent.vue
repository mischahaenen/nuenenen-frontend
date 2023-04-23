<template>
  <div>
    <div v-if="props.isPreview">
      <div
        class="preview"
        v-html="htmlContent.find((x) => x.includes('<p>'))"
      ></div>
    </div>
    <div v-else>
      <div
        v-for="(block, index) in htmlContent"
        :key="index"
        v-html="block"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import edjsHTML from 'editorjs-html'
const props = defineProps<{
  content: string
  isPreview?: boolean
  previewLines?: number
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const htmlContent = edjsHTML().parseStrict(JSON.parse(props.content))
</script>

<style scoped lang="scss">
.preview :deep(p) {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: v-bind('props.previewLines || 3');
  -webkit-box-orient: vertical;
}
</style>
