<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="props.isPreview" class="preview" v-html="previewHtml"></div>
  <div v-else>
    <span
      v-for="(block, index) in htmlContent"
      :key="index"
      :class="props.textAlign || 'center'"
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
  textAlign?: 'center' | 'left'
}>()

const htmlContent = ref<string[] | Error>([])
const previewHtml = ref<string>('')

watch(
  () => props.content,
  () => {
    htmlContent.value = edjsHTML().parseStrict(JSON.parse(props.content))
    previewHtml.value = htmlContent.value.find((x) => x.includes('<p>')) || ''
  },
  { immediate: true, deep: true }
)
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
.left {
  text-align: left;
}
</style>
