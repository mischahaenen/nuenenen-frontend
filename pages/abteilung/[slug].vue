<template>
  <p v-if="pending">Loading...</p>
  <div v-else>
    <BaseBanner
      :title="stepAttributes.Name"
      :description="stepAttributes.Description"
      :is-rich-text="true"
    />
    <div
      v-for="(zone, index) in stepAttributes.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'section' : 'colored-section'"
    >
      <SectionComponent
        v-if="zone.__component == 'pages.section'"
        :zone="zone"
        :index="index"
      />
      <EventComponent
        v-if="zone.__component == 'pages.event'"
        :zone="zone"
        :index="index"
      />
      <DocumentComponent
        v-if="zone.__component == 'pages.document'"
        :zone="zone"
        :index="index"
      />
      <GroupComponent
        v-if="zone.__component == 'pages.group'"
        :zone="zone"
        :index="index"
      />
      <div v-if="zone.__component == 'pages.image'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <ImageSliderComponent v-if="zone.images" :images="zone.images.data" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const {
  data: step,
  pending,
  error,
} = await getStep(route.params.slug as string)

if (error.value) {
  await navigateTo('/not-found')
  throw createError({
    statusCode: 404,
    statusMessage: error.value.name,
  })
}

const stepAttributes = computed(() => step.value?.data[0]?.attributes || null)

useHead({
  title: `Pfadi Nünenen - ${stepAttributes.value?.Name || ''}`,
})
</script>
