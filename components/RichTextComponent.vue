<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-if="props.isPreview"
    class="preview"
    v-html="htmlContent.find((x) => x.includes('<p>'))"
  ></div>
  <div v-else>
    <span
      v-for="(block, index) in htmlContent"
      :key="index"
      class="center"
      v-html="block"
    ></span>
  </div>
</template>

<script lang="ts" setup>
import edjsHTML from 'editorjs-html'
const props = defineProps<{
  content: string
  isPreview?: boolean
  previewLines?: number
}>()

const htmlContent = edjsHTML().parseStrict(JSON.parse(props.content))
</script>
<!-- TODO: Fix dirty solution .center -->
<style scoped lang="scss">
.preview :deep(p) {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: v-bind('props.previewLines || 3');
  -webkit-box-orient: vertical;
}
.center {
  display: flex;
  justify-content: center;
}
</style>
