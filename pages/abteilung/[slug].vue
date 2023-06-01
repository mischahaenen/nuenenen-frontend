<template>
  <div v-if="stepAttributes">
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
const step = useState<ISteps | null>(() => null)

const stepAttributes = computed(() => step.value?.data[0]?.attributes || null)

const fetchData = async () => {
  const { data, error: fetchError } = await getStep(route.params.slug as string)

  if (fetchError.value) {
    await navigateTo('/not-found')
    throw createError({
      statusCode: 404,
      statusMessage: fetchError.value.name,
    })
  }
  step.value = data.value
}

useHead({
  title: `Pfadi Nünenen - ${stepAttributes.value?.Name || ''}`,
})

onMounted(fetchData)

watch(() => route.params.slug, fetchData)
</script>
