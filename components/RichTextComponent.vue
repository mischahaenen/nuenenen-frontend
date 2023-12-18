<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-if="props.isPreview && props.content"
    class="preview"
    v-html="previewHtml"
  ></div>
  <span
    v-for="(block, index) in htmlContent"
    v-else
    :key="index"
    v-html="block"
  >
  </span>
</template>

<script lang="ts" setup>
import edjsHTML from 'editorjs-html'
const props = defineProps<{
  content: string | null
  isPreview?: boolean
  previewLines?: number
}>()

const htmlContent = ref<string[] | Error>([])
const previewHtml = ref<string>('')

watch(
  () => props.content,
  () => {
    if (!props.content) return
    htmlContent.value = edjsHTML().parseStrict(JSON.parse(props.content))
    previewHtml.value = htmlContent.value.find((x) => x.includes('<p>')) || ''
  },
  { immediate: true, deep: true }
)
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
