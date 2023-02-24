<template>
  <div v-if="step">
    <BaseBanner
      :title="step.Name"
      :description="step.Description"
      :is-rich-text="true"
    />
    <div
      v-for="(zone, index) in step.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'colored-section' : 'section'"
    >
      <div class="container">
        <h2 v-if="index % 2 !== 0">{{ zone.Title }}</h2>
        <ColoredTitleComponent v-else :title="zone.Title" />
        <div v-if="zone.Description">
          <RichTextComponent :content="zone.Description" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()
const stepRes = await getStep(route.params.slug as string)
const step = stepRes.data[0].attributes
// navigate to 404 page when no slug is found
if (!step) await navigateTo('/not-found')
useHead({
  title: `Pfadi Nünenen - ${step.Name}`,
})
</script>
<style scoped lang="scss">
.container {
  margin: 6rem auto var(--space-large) auto;

  h3 {
    margin: var(--space-medium) 0 0 0;
    font-weight: 300;
    color: var(--color-accent-900);
  }
}
</style>
