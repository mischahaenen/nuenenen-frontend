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
      <div v-if="zone.__component === 'pages.image'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <ImageSliderComponent
          v-if="(zone as ImageZone).images"
          :images="(zone as ImageZone).images.data"
        />
      </div>
      <div v-if="zone.__component === 'pages.section'" class="container">
        <SectionComponent
          :zone="(zone as Section)"
          :index="index"
        ></SectionComponent>
      </div>
      <div v-if="zone.__component === 'pages.blog'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />
        <BlogComponent />
      </div>
      <div v-if="zone.__component === 'pages.steps'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="(zone as StepZone).Description"
          :content="(zone as StepZone).Description"
        />
        <div class="flexRow">
          <nuxt-link
            v-for="step of (zone as StepZone).steps.data"
            :key="step.attributes.Name"
            :to="'abteilung/' + step.attributes.Slug"
          >
            <!-- <nuxt-img
              provider="strapi"
              class="image"
              :src="step.attributes.logo.data.attributes.url"
              :alt="step.attributes.logo.data.attributes.name"
            /> -->
            <h3>{{ step.attributes.Name }}</h3>
          </nuxt-link>
        </div>
      </div>
      <div v-if="zone.__component === 'pages.pfadiheim'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />
        <h3>Reserviere das Pfadiheim</h3>
        <iframe
          scrolling="no"
          class="pfadiheim-frame"
          :src="zone.iFrame"
        ></iframe>
        <h3 v-if="zone.images">Impressionen</h3>
        <ImageSliderComponent
          v-if="zone.images"
          :images="zone.images?.data"
        ></ImageSliderComponent>
      </div>
      <div v-if="zone.__component === 'pages.testimonials'" class="container">
        <TestimonialComponent
          v-if="zone.testimonials && zone.Title && zone.Subtitle"
          :title="zone.Title"
          :sub-title="zone.Subtitle"
          :testimonials="zone.testimonials"
        ></TestimonialComponent>
      </div>
      <div v-if="zone.__component === 'pages.contact'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="(zone as ContactZone).Description"
          :content="(zone as ContactZone).Description"
        ></RichTextComponent>
        <ContactComponent :index="index" />
      </div>
      <div v-if="zone.__component == 'pages.document'" class="container">
        <DocumentComponent :zone="(zone as Document)" :index="index" />
      </div>
      <div v-if="zone.__component == 'pages.sponsors'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="(zone as SponsorZone).Description"
          :content="(zone as SponsorZone).Description"
        ></RichTextComponent>
        <SponsorComponent
          :ids="(zone as SponsorZone).sponsors.data.map((sponsor) => sponsor.id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const page = ref<Page | null>(null)
const title = computed(() => {
  if (!page.value) return 'Pfadi Nünenen'
  return `Pfadi Nünenen - ${
    page.value?.attributes?.slug.charAt(0).toUpperCase() +
    page.value?.attributes?.slug.slice(1)
  }`
})

useHead(() => ({
  title: title.value,
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
.pfadiheim-frame {
  width: 100%;
  max-width: 660px;
  height: 903px;
  overflow: hidden;
  border: none;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
}
@media screen and (max-width: 600px) {
  .pfadiheim-frame {
    height: auto;
  }
}
</style>
