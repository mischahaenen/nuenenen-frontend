<template>
  <div v-if="stepAttributes">
    <BaseBanner
      :title="stepAttributes.Name"
      :description="stepAttributes.Description"
      :is-rich-text="true"
      :image="stepAttributes.logo.data"
    />
    <section
      v-for="(zone, index) in stepAttributes.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'section' : 'colored-section'"
    >
      <SectionComponent
        v-if="zone.__component == 'pages.section'"
        :title="(zone as Section).Title"
        :description="(zone as Section).Description"
        :image="(zone as Section).Image.data[0]"
        :index="index"
        class="container"
      />
      <div v-if="zone.__component == 'pages.kastenzeddel'" class="container">
        <TitleComponent title="Kastenzeddel" :index="index"></TitleComponent>
        <KastenzeddelComponent
          :kastenzeddel="(zone as Kastenzeddel)"
          :step="stepAttributes.Slug"
        />
      </div>
      <div v-if="zone.__component == 'pages.group'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <div v-if="(zone as Group).members" class="member-section">
          <UserCard
            v-for="member in (zone as Group).members.data"
            :user="member"
            :key="`${member.id}-${member.attributes.username}`"
          ></UserCard>
        </div>
      </div>
      <DocumentComponent
        v-if="zone.__component == 'pages.document'"
        :zone="(zone as Document)"
        :index="index"
        class="container"
      />
      <div v-if="zone.__component == 'pages.image'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <ImageSliderComponent
          v-if="(zone as ImageZone).images"
          :images="(zone as ImageZone).images.data"
        />
      </div>
    </section>
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
<style scoped lang="scss">
.member-section {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-medium);
  justify-content: center;
}
</style>
