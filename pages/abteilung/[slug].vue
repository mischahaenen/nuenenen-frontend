<template>
  <div v-if="stepAttributes" class="content-grid">
    <BaseBanner
      :title="stepAttributes.Name"
      :description="stepAttributes.Description"
      :is-rich-text="true"
      :image="stepAttributes.logo.data"
    />
    <template v-for="(zone, index) in stepAttributes.pageZone" :key="index">
      <PageZoneSectionComponent
        v-if="zone.__component == 'pages.section'"
        :zone="(zone as Section)"
        :index="index"
      />
      <StepZoneKastenzeddelComponent
        v-if="zone.__component == 'pages.kastenzeddel'"
        :kastenzeddel="(zone as Kastenzeddel)"
        :step="stepAttributes.Slug"
        :index="index"
      />
      <section
        v-if="zone.__component == 'pages.group'"
        :class="[
          'pt-medium pb-medium',
          {
            'full-width content-grid bg-primary-50 dark:bg-primary-800':
              index % 2 === 1,
          },
        ]"
      >
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <div v-if="(zone as Group).members" class="member-section">
          <UserCard
            v-for="member in (zone as Group).members.data"
            :key="`${member.id}-${member.attributes.username}`"
            :user="member"
          ></UserCard>
        </div>
      </section>
      <PageZoneDocumentComponent
        v-if="zone.__component == 'pages.document'"
        :zone="(zone as Document)"
        :index="index"
      />
      <PageZoneImageComponent
        v-if="zone.__component == 'pages.image'"
        :title="zone.Title"
        :zone="(zone as ImageZone)"
        :index="index"
      ></PageZoneImageComponent>
    </template>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const step = useState<Steps | null>(() => null)
const stepAttributes = computed(() => step.value?.data[0]?.attributes || null)

const fetchData = async () => {
  const { data, error: fetchError } = await getStep(route.params.slug as string)
  if (fetchError.value) {
    await navigateTo('/404')
    throw createError({
      statusCode: 404,
      statusMessage: fetchError.value.name,
    })
  }
  step.value = data.value

  useHead({
    title: `Pfadi Nünenen - ${stepAttributes.value?.Name || ''}`,
  })
}

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
