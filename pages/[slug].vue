<template>
  <div v-if="page">
    <BaseBanner
      :title="page.attributes.title"
      :description="page.attributes.description"
    />
    <div
      v-for="(zone, index) in page.attributes.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'section' : 'colored-section'"
    >
      <div
        v-if="
          [
            'pages.section',
            'pages.blog',
            'pages.steps',
            'pages.pfadiheim',
          ].includes(zone.__component)
        "
        class="container"
      >
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />

        <div v-if="zone.__component === 'pages.blog'">
          <BlogComponent />
        </div>
        <div v-if="zone.__component === 'pages.steps'">
          <div class="flexRow">
            <nuxt-link
              v-for="step of steps"
              :key="step.attributes.Name"
              :to="'abteilung/' + step.attributes.Slug"
            >
              <nuxt-img
                class="image"
                :src="url + step.attributes.logo.data.attributes.url"
                :alt="step.attributes.logo.data.attributes.name"
              />
              <h3>{{ step.attributes.Name }}</h3>
            </nuxt-link>
          </div>
        </div>
        <div v-if="zone.__component === 'pages.pfadiheim'">
          <h3>Reserviere das Pfadiheim</h3>
          <iframe
            scrolling="no"
            class="pfadiheim-frame"
            :src="zone.iFrame"
          ></iframe>
          <h3>Impressionen</h3>
          <ImageSliderComponent
            v-if="zone.images"
            :images="zone.images?.data"
          ></ImageSliderComponent>
        </div>
      </div>
      <div v-if="zone.__component === 'pages.testimonials'" class="container">
        <div v-if="zone.__component === 'pages.testimonials'">
          <TestimonialComponent
            v-if="zone.testimonials && zone.Title && zone.Subtitle"
            :title="zone.Title"
            :sub-title="zone.Subtitle"
            :testimonials="zone.testimonials"
          ></TestimonialComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const page = ref<Page | null>(null)
const steps = useState<IStep[]>(() => [])
const events = useState<IEvent[]>(() => [])
const url = useStrapiUrl()

useHead(() => ({ title: `Pfadi Nünenen - ${page.value?.attributes?.slug}` }))

const fetchData = async () => {
  const response = await getPage(route.params.slug as string)
  page.value = response.data[0]

  if (hasComponent('pages.steps')) {
    const stepRes = await getStepNames()
    steps.value = stepRes.data
  }

  if (hasComponent('pages.event')) {
    const res = await getEvents()
    events.value = res.data
  }
}
const hasComponent = (component: string) => {
  return page.value?.attributes.pageZone.some(
    (zone) => zone.__component === component
  )
}

onMounted(() => {
  fetchData()
})

watch(
  () => route.params.slug,
  () => {
    fetchData()
  },
  { immediate: true }
)
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
.pfadiheim-frame {
  width: 100%;
  height: 903px;
  overflow: hidden;
  border: none;
}
@media screen and (max-width: 600px) {
  .pfadiheim-frame {
    height: auto;
  }
}
</style>
