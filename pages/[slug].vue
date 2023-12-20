<template>
  <main class="content-grid">
    <template v-if="pending"><p>Loading...</p></template>
    <template v-if="error"><p>Something went wrong</p></template>
    <template v-if="page">
      <BaseBanner
        id="main"
        :title="page.data[0].attributes.title"
        :description="page.data[0].attributes.description"
      />
      <template
        v-for="(zone, index) in page.data[0].attributes.pageZone"
        :key="`${zone.__component}-${index}}`"
      >
        <PageZoneImageComponent
          v-if="zone.__component === 'pages.image'"
          :title="(zone as ImageZone).Title"
          :zone="(zone as ImageZone)"
          :index="index"
        />
        <PageZoneSectionComponent
          v-if="zone.__component === 'pages.section'"
          :zone="(zone as Section)"
          :index="index"
        />
        <PageZoneBlogComponent
          v-if="zone.__component === 'pages.blog'"
          :zone="(zone as BlogZone)"
          :index="index"
        />
        <PageZoneStepsComponent
          v-if="zone.__component === 'pages.steps'"
          :zone="(zone as StepZone)"
          :index="index"
        />
        <PageZonePfadiheimComponent
          v-if="zone.__component === 'pages.pfadiheim'"
          :zone="(zone as IFrame)"
          :index="index"
        />
        <PageZoneTestimonialComponent
          v-if="zone.__component === 'pages.testimonials'"
          :title="(zone as Testimonial).Title"
          :sub-title="(zone as Testimonial).Subtitle"
          :testimonials="(zone as Testimonial).testimonials"
          :index="index"
        />
        <PageZoneContactComponent
          v-if="zone.__component === 'pages.contact'"
          :zone="(zone as ContactZone)"
          :index="index"
        />
        <PageZoneDocumentComponent
          v-if="zone.__component == 'pages.document'"
          :zone="(zone as Document)"
          :index="index"
        />
        <PageZoneSponsorComponent
          v-if="zone.__component == 'pages.sponsors'"
          :zone="(zone as SponsorZone)"
          :index="index"
        />
      </template>
    </template>
  </main>
</template>

<script lang="ts" setup>
const route = useRoute()

const {
  data: page,
  pending,
  error,
} = await useAsyncData('page', () => getPage(route.params.slug as string))

const title = computed(() => {
  if (!page.value) return 'Pfadi Nünenen'
  return `Pfadi Nünenen - ${
    page.value?.data[0].attributes?.slug.charAt(0).toUpperCase() +
    page.value?.data[0].attributes?.slug.slice(1)
  }`
})

useHead(() => ({
  title: title.value,
  'Content-Security-Policy': 'upgrade-insecure-requests',
}))
</script>
