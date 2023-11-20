<template>
  <div v-if="page">
    <BaseBanner
      :title="page.attributes.title"
      :description="page.attributes.description"
    />
    <section
      v-for="(zone, index) in page.attributes.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'section' : 'colored-section'"
    >
      <div v-if="zone.__component === 'pages.image'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <ImageSliderComponent
          v-if="(zone as ImageZone).images"
          :images="(zone as ImageZone).images.data"
        />
      </div>
      <div v-if="zone.__component === 'pages.section'" class="container">
        <SectionComponent
          :title="(zone as Section).Title"
          :description="(zone as Section).Description"
          :image="(zone as Section).Image"
          :index="index"
        ></SectionComponent>
      </div>
      <div v-if="zone.__component === 'pages.blog'" class="container">
        <SectionComponent
          :title="(zone as BlogZone).Title"
          :description="(zone as BlogZone).Description"
          :index="index"
        ></SectionComponent>
        <BlogComponent />
      </div>
      <div v-if="zone.__component === 'pages.steps'" class="container">
        <SectionComponent
          :title="(zone as StepZone).Title"
          :description="(zone as StepZone).Description"
          :index="index"
        ></SectionComponent>
        <div class="flexRow">
          <nuxt-link
            v-for="step of (zone as StepZone).steps.data"
            :key="step.attributes.Name"
            :to="'abteilung/' + step.attributes.Slug"
          >
            <nuxt-img
              format="webp"
              class="image"
              :src="step.attributes.logo.data.attributes.url"
              :alt="step.attributes.logo.data.attributes.name"
            />
            <h3>{{ step.attributes.Name }}</h3>
          </nuxt-link>
        </div>
      </div>
      <div v-if="zone.__component === 'pages.pfadiheim'" class="container">
        <SectionComponent
          :title="(zone as IFrame).Title"
          :description="(zone as IFrame).Description"
          :images="(zone as IFrame).images"
          :index="index"
        >
        </SectionComponent>
        <PfadiheimComponent
          :index="index"
          :zone="(zone as IFrame)"
        ></PfadiheimComponent>
      </div>
      <div v-if="zone.__component === 'pages.testimonials'" class="container">
        <TestimonialComponent
          v-if="(zone as Testimonial).testimonials && (zone as Testimonial).Title && (zone as Testimonial).Subtitle"
          :title="(zone as Testimonial).Title"
          :sub-title="(zone as Testimonial).Subtitle"
          :testimonials="(zone as Testimonial).testimonials"
        ></TestimonialComponent>
      </div>
      <div v-if="zone.__component === 'pages.contact'" class="container">
        <SectionComponent
          :title="(zone as ContactZone).Title"
          :description="(zone as ContactZone).Description"
          :index="index"
        ></SectionComponent>
        <ContactComponent :index="index" />
      </div>
      <div v-if="zone.__component == 'pages.document'" class="container">
        <DocumentComponent :zone="(zone as Document)" :index="index" />
      </div>
      <div v-if="zone.__component == 'pages.sponsors'" class="container">
        <SectionComponent
          :title="(zone as SponsorZone).Title"
          :description="(zone as SponsorZone).Description"
          :index="index"
        ></SectionComponent>
        <SponsorComponent :sponsors="(zone as SponsorZone).sponsors.data" />
      </div>
    </section>
  </div>
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
  const response = await getPage(route.params.slug as string)
  page.value = response.data[0]
}

onMounted(() => {
  fetchData()
})

watch(() => route.params.slug, fetchData, { immediate: true })
</script>

<style scoped lang="scss">
.flexRow {
  display: flex;
  gap: var(--space-large);
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}

.image {
  display: block;
  width: 100%;
  max-width: 200px;
  height: auto;
}

h3 {
  text-align: center;
}

a {
  text-decoration: none;
}

a:hover h3 {
  text-decoration: underline;
}
</style>
