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
      <div
        v-if="
          [
            'pages.section',
            'pages.kastenzeddel',
            'pages.document',
            'pages.group',
            'pages.image',
          ].includes(zone.__component)
        "
        class="container"
      >
        <SectionComponent
          v-if="zone.__component == 'pages.section'"
          :zone="(zone as Section)"
          :index="index"
        />
        <div v-if="zone.__component == 'pages.kastenzeddel'">
          <TitleComponent title="Kastenzeddel" :index="index"></TitleComponent>
          <KastenzeddelComponent
            :kastenzeddel="(zone as Kastenzeddel)"
            :step="stepAttributes.Slug"
          />
        </div>
        <DocumentComponent
          v-if="zone.__component == 'pages.document'"
          :zone="(zone as Document)"
          :index="index"
        />
        <GroupComponent
          v-if="zone.__component == 'pages.group'"
          :zone="(zone as Group)"
          :index="index"
        />
        <div v-if="zone.__component == 'pages.image'">
          <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
          <ImageSliderComponent
            v-if="(zone as ImageZone).images"
            :images="(zone as ImageZone).images.data"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const step = useState<Steps | null>(() => null)

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
watch(() => route.params.slug, fetchData, { immediate: true })
</script>
