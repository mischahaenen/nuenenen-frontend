<template>
  <main class="content-grid">
    <template v-if="pending"></template>
    <template v-if="error"><p>Something went wrong</p></template>
    <template v-if="stepAttributes">
      <BaseBanner
        :title="stepAttributes.Name"
        :description="stepAttributes.Description"
        :image="stepAttributes.logo.data"
      />
      <template v-for="(zone, index) in stepAttributes.pageZone" :key="index">
        <PageZoneSectionComponent
          v-if="zone.__component == 'pages.section'"
          :id="zone.Title"
          :zone="(zone as Section)"
          :index="index"
        />
        <StepZoneKastenzettelComponent
          v-if="zone.__component == 'pages.kastenzeddel'"
          :id="zone.Title"
          :kastenzeddel="(zone as Kastenzeddel)"
          :step="stepAttributes.Slug"
          :index="index"
        />
        <PageZoneDocumentComponent
          v-if="zone.__component == 'pages.document'"
          :id="zone.Title"
          :zone="(zone as Document)"
          :index="index"
        />
        <PageZoneImageComponent
          v-if="zone.__component == 'pages.image'"
          :id="zone.Title"
          :title="zone.Title"
          :zone="(zone as ImageZone)"
          :index="index"
        ></PageZoneImageComponent>
        <PageZoneTeamComponent
          v-if="zone.__component == 'pages.group'"
          :id="zone.Title"
          :zone="(zone as Group)"
          :index="index"
        ></PageZoneTeamComponent>
        <PageZoneTestimonialComponent
          v-if="zone.__component === 'pages.testimonials'"
          :id="zone.Title"
          :title="(zone as Testimonial).Title"
          :sub-title="(zone as Testimonial).Subtitle"
          :testimonials="(zone as Testimonial).testimonials"
          :index="index"
        />
        <StepZoneQPComponent
          v-if="zone.__component == 'pages.quartalsprogramm'"
          :id="zone.Title"
          :zone="(zone as QPZone)"
          :index="index"
        >
        </StepZoneQPComponent>
      </template>
    </template>
  </main>
</template>
<script setup lang="ts">
import { useNavigationStore } from '~/store/navigation'
const route = useRoute()
const navigation = useNavigationStore()

const {
  data: step,
  pending,
  error,
} = await useAsyncData('step', () => getStep(route.params.slug as string))
const stepAttributes = computed(() => step.value?.data[0].attributes ?? null)

watch(
  route,
  () => {
    navigation.close()
  },
  { immediate: true, deep: true }
)
</script>
