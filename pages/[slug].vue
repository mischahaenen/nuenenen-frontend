<template>
  <main class="content-grid">
    <template v-if="error">
      <p>Something went wrong: {{ error }}</p>
    </template>
    <template v-if="!page || !page.data || page.data.length === 0">
      <p>Loading...</p>
    </template>
    <template v-else-if="page && page.data && page.data.length > 0">
      <BaseBanner
        id="main"
        :title="page.data[0].title"
        :description="page.data[0].description"
        :action-button-name="page.data[0].ActionButtonName"
        :action-button-link="page.data[0].ActionButtonLink"
      />
      <template
        v-for="(zone, index) in page.data[0].pageZone"
        :key="`${zone.__component}-${index}}`"
      >
        <PageZoneImageComponent
          v-if="zone.__component === 'pages.image'"
          :id="zone.Title"
          :title="(zone as ImageZone).Title"
          :zone="(zone as ImageZone)"
          :index="index"
        />
        <PageZoneSectionComponent
          v-if="zone.__component === 'pages.section'"
          :id="zone.Title"
          :zone="(zone as Section)"
          :index="index"
        />
        <PageZoneBlogComponent
          v-if="zone.__component === 'pages.blog'"
          :id="zone.Title"
          :zone="(zone as BlogZone)"
          :index="index"
        />
        <PageZoneStepsComponent
          v-if="zone.__component === 'pages.steps'"
          :id="zone.Title"
          :zone="(zone as StepZone)"
          :index="index"
        />
        <PageZonePfadiheimComponent
          v-if="zone.__component === 'pages.pfadiheim'"
          :id="zone.Title"
          :zone="(zone as IFrame)"
          :index="index"
        />
        <PageZoneTestimonialComponent
          v-if="zone.__component === 'pages.testimonials'"
          :id="zone.Title"
          :title="(zone as Testimonial).Title"
          :sub-title="(zone as Testimonial).Subtitle"
          :testimonials="(zone as Testimonial).testimonials"
          :index="index"
        />
        <PageZoneContactComponent
          v-if="zone.__component === 'pages.contact'"
          :id="zone.Title"
          :zone="(zone as ContactZone)"
          :index="index"
        />
        <PageZoneDocumentComponent
          v-if="zone.__component == 'pages.document'"
          :id="zone.Title"
          :zone="(zone as Document)"
          :index="index"
        />
        <PageZoneSponsorComponent
          v-if="zone.__component == 'pages.sponsors'"
          :id="zone.Title"
          :zone="(zone as SponsorZone)"
          :index="index"
        />

        <PageZoneTeamComponent
          v-if="zone.__component == 'pages.group'"
          :id="zone.Title"
          :zone="(zone as Group)"
          :index="index"
        ></PageZoneTeamComponent>
      </template>
    </template>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const pageId = computed(() => `page-${route.params.slug}`)

const { data: page, error } = useAsyncData(pageId, () =>
  getPage(route.params.slug as string)
)

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
