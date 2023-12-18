<template>
  <main v-if="page" class="content-grid">
    <BaseBanner
      id="main"
      :title="page.attributes.title"
      :description="page.attributes.description"
    />
    <template
      v-for="(zone, index) in page.attributes.pageZone"
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
  </main>
</template>

<script lang="ts" setup>
const route = useRoute()
const page = useState<Page | null>(() => null)
const title = computed(() => {
  if (!page.value) return 'Pfadi Nünenen'
  return `Pfadi Nünenen - ${
    page.value?.attributes?.slug.charAt(0).toUpperCase() +
    page.value?.attributes?.slug.slice(1)
  }`
})

useHead(() => ({
  title: title.value,
  'Content-Security-Policy': 'upgrade-insecure-requests',
}))

const fetchData = async () => {
  const { data: pageResponse, error } = await useAsyncData(() =>
    getPage(route.params.slug as string)
  )
  if (error.value) navigateTo('/404')
  if (!pageResponse.value) return
  page.value = pageResponse.value.data[0]
}

onMounted(() => {
  fetchData()
})

watch(
  () => route.params.slug,
  async () => {
    await fetchData()
  },
  { immediate: true }
)
</script>
