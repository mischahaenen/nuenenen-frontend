<template>
  <div>
    <h3>{{ props.event.attributes.Title }}</h3>
    <div v-if="props.event.attributes.Description">
      <RichTextComponent :content="props.event.attributes.Description" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ event: IEvent }>()
</script>
