<template>
  <div>
    <BaseBanner :title="page.title" :description="page.description" />
    <div
      v-for="(zone, index) in page.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'colored-section' : 'section'"
    >
      <div v-if="zone.__component == 'pages.section'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const response = await getPage('mitmachen')
const page = response.data[0].attributes
</script>
