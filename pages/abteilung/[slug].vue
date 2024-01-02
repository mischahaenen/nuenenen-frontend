<template>
  <main class="content-grid">
    <template v-if="pending"><p>Loading...</p></template>
    <template v-if="error"><p>Something went wrong</p></template>
    <template v-if="stepAttributes">
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
          :id="zone.Title"
        />
        <StepZoneKastenzeddelComponent
          v-if="zone.__component == 'pages.kastenzeddel'"
          :kastenzeddel="(zone as Kastenzeddel)"
          :step="stepAttributes.Slug"
          :index="index"
          :id="zone.Title"
        />
        <section
          v-if="zone.__component == 'pages.group'"
          :class="[
            'pt-medium pb-medium',
            {
              'full-width content-grid bg-accent-50 dark:bg-primary-700':
                index % 2 === 1,
            },
          ]"
          :id="zone.Title"
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
          :id="zone.Title"
        />
        <PageZoneImageComponent
          v-if="zone.__component == 'pages.image'"
          :title="zone.Title"
          :zone="(zone as ImageZone)"
          :index="index"
          :id="zone.Title"
        ></PageZoneImageComponent>
      </template>
    </template>
  </main>
</template>
<script setup lang="ts">
const route = useRoute()

const {
  data: step,
  pending,
  error,
} = await useAsyncData('step', () => getStep(route.params.slug as string))
const stepAttributes = computed(() => step.value?.data[0].attributes ?? null)
</script>
<style scoped lang="scss">
.member-section {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-medium);
  justify-content: center;
}
</style>
