<template>
  <div v-if="page">
    <BaseBanner :title="page.title" :description="page.description" />
    <div
      v-for="(zone, index) in page.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'colored-section' : 'section'"
    >
      <div class="container">
        <h2 v-if="index % 2 !== 0">{{ zone.Title }}</h2>
        <ColoredTitleComponent v-else :title="zone.Title" />
        <div v-if="zone.Description">
          <RichTextComponent :content="zone.Description" />
        </div>
        <div v-if="zone.__component === 'pages.steps'">...Lade Stufen</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const response = await getPage('abteilung')
const page = response.data[0].attributes
</script>
