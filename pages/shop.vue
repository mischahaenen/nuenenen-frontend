<template>
  <div>
    <BaseBanner :title="page.title" :description="page.description" />
    <div
      v-for="(zone, index) in page.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'colored-section' : 'section'"
    >
      <div class="container">
        <h2>{{ zone.Title }}</h2>
        <div v-if="zone.Description">
          <RichTextComponent :content="zone.Description" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const response = await getPage('shop')
const page = response.data[0].attributes
</script>
