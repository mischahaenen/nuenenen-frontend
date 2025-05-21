<template>
  <main class="content-grid">
    <template v-if="error">
      <p>Something went wrong: {{ error }}</p>
    </template>
    <template v-else-if="page?.data?.length > 0">
      <BaseBanner
        id="main"
        :title="page.data[0].title"
        :description="page.data[0].description"
        :action-button-name="page.data[0].ActionButtonName"
        :action-button-link="page.data[0].ActionButtonLink"
      />
      <component
        :is="resolveComponent(zone.__component)"
        v-for="(zone, index) in page.data[0].pageZone"
        :id="zone.Title"
        :key="`${zone.__component}-${index}}`"
        :zone="zone"
        :index="index"
        :title="resolveZoneTitle(zone)"
        :sub-title="resolveZoneSubTitle(zone)"
        :testimonials="resolveZoneTestimonials(zone)"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: page, error } = useAsyncData(
  'page',
  () => getPage(route.params.slug as string),
  {
    server: true,
    lazy: false,
    default: () => ({ data: [] }),
    transform: (data) => data || { data: [] },
  }
)

// Map component types to their Vue components
const componentMap: Record<string, string> = {
  'pages.image': 'PageZoneImageComponent',
  'pages.section': 'PageZoneSectionComponent',
  'pages.blog': 'PageZoneBlogComponent',
  'pages.steps': 'PageZoneStepsComponent',
  'pages.pfadiheim': 'PageZonePfadiheimComponent',
  'pages.testimonials': 'PageZoneTestimonialComponent',
  'pages.contact': 'PageZoneContactComponent',
  'pages.document': 'PageZoneDocumentComponent',
  'pages.sponsors': 'PageZoneSponsorComponent',
  'pages.group': 'PageZoneTeamComponent',
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

// Resolve title property for testimonial component
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

const title = computed(() => {
  if (!page.value || !page.value.data || page.value.data.length === 0)
    return 'Pfadi Nünenen'
  return `Pfadi Nünenen - ${
    page.value.data[0].slug.charAt(0).toUpperCase() +
    page.value.data[0].slug.slice(1)
  }`
})

useHead(() => ({
  title: title.value,
  'Content-Security-Policy': 'upgrade-insecure-requests',
}))

const { gtag } = useGtag()
// SSR-ready
gtag('event', 'screen_view', {
  app_name: 'Webapp',
  screen_name: page.value?.data?.[0]?.slug ?? route.params.slug ?? 'slug',
})
</script>
