<template>
  <main class="content-grid">
    <template v-if="pending">
      <p>Loading...</p>
    </template>
    <template v-if="error"><p>Something went wrong</p></template>
    <template v-else-if="stepAttributes">
      <BaseBanner
        :title="stepAttributes.Name"
        :description="stepAttributes.Description"
        :image="stepAttributes.logo.data"
      />
      <component
        v-for="(zone, index) in stepAttributes.pageZone"
        :key="`${zone.__component}-${index}}`"
        :is="resolveComponent(zone.__component)"
        :id="zone.Title"
        :zone="zone"
        :index="index"
        :title="resolveZoneTitle(zone)"
        :sub-title="resolveZoneSubTitle(zone)"
        :testimonials="resolveZoneTestimonials(zone)"
        :kastenzeddel="resolveZoneKastenzeddel(zone)"
        :step="stepAttributes.Slug"
      />
    </template>
  </main>
</template>
<script setup lang="ts">
const route = useRoute()

const stepId = computed(() => `step-${route.params.slug}`)

const {
  data: step,
  pending,
  error,
} = useAsyncData(
  () => getStep(route.params.slug as string),
  {
    key: stepId,
    server: true,
    lazy: false,
    default: () => ({ data: [] }),
    transform: (data) => data || { data: [] }
  }
)
const stepAttributes = computed(() => step.value?.data[0].attributes ?? null)

// Map component types to their Vue components
const componentMap: Record<string, string> = {
  'pages.section': 'PageZoneSectionComponent',
  'pages.kastenzeddel': 'StepZoneKastenzettelComponent',
  'pages.document': 'PageZoneDocumentComponent',
  'pages.image': 'PageZoneImageComponent',
  'pages.group': 'PageZoneTeamComponent',
  'pages.testimonials': 'PageZoneTestimonialComponent',
  'pages.quartalsprogramm': 'StepZoneQPComponent',
}

// Resolve component based on component name
const resolveComponent = (componentName: string): string => {
  return componentMap[componentName] || 'div' // fallback to div if component not found
}

// Type guards for zone types
function isImageZone(zone: PageZoneItem): zone is ImageZone {
  return zone.__component === 'pages.image'
}

function isTestimonialZone(zone: PageZoneItem): zone is Testimonial {
  return zone.__component === 'pages.testimonials'
}

function isKastenzeddelZone(zone: PageZoneItem): zone is Kastenzeddel {
  return zone.__component === 'pages.kastenzeddel'
}

// Resolve title property
function resolveZoneTitle(zone: PageZoneItem): string {
  if (isImageZone(zone) || isTestimonialZone(zone)) {
    return zone.Title
  }
  return ''
}

// Resolve subtitle property for testimonial component
function resolveZoneSubTitle(zone: PageZoneItem): string {
  if (isTestimonialZone(zone)) {
    return zone.Subtitle
  }
  return ''
}

// Resolve testimonials property for testimonial component
function resolveZoneTestimonials(zone: PageZoneItem): any {
  if (isTestimonialZone(zone)) {
    return zone.testimonials
  }
  return null
}

// Resolve kastenzeddel property
function resolveZoneKastenzeddel(zone: PageZoneItem): Kastenzeddel | null {
  if (isKastenzeddelZone(zone)) {
    return zone
  }
  return null
}
</script>
