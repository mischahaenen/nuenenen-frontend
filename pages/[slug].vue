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
      <div v-if="zone.__component == 'pages.section'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />
      </div>
      <div v-if="zone.__component === 'pages.blog'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />
        <div class="blog-filter">
          <button
            class="button accent-button"
            :class="{ active: activeButton === 'all' }"
            @click="getPosts()"
          >
            Alle
          </button>
          <button
            v-for="(step, jndex) of steps"
            :key="jndex"
            class="button accent-button"
            :class="{ active: activeButton === step.attributes.Name }"
            @click="getPostsByStep(step.attributes.Name)"
          >
            {{ step.attributes.Name }}
          </button>
        </div>
        <div v-if="posts.length" class="post-grid">
          <PostComponent
            v-for="(post, i) in posts"
            :key="post.id"
            :post="post"
            :is-first="i === 0"
            class="post-grid-item"
          />
        </div>
        <div v-else class="fallback">
          <p>Hier wurde noch nichts veröffentlicht.</p>
          <img
            src="../assets/svg/not_found.svg"
            alt="Space Aliens nothing found image"
          />
        </div>
      </div>
      <div v-if="zone.__component === 'pages.steps'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />
        <div class="flexRow">
          <nuxt-link
            v-for="step of steps"
            :key="step.attributes.Name"
            :to="'abteilung/' + step.attributes.Slug"
          >
            <img
              class="image"
              :src="url + step.attributes.logo.data.attributes.url"
              :alt="step.attributes.logo.data.attributes.name"
            />
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
        <h3>Impressionen</h3>
        <ImageSliderComponent
          v-if="zone.images"
          :images="zone.images?.data"
        ></ImageSliderComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const page = ref<Page | null>(null)
const posts = useState<IPost[]>(() => [])
const events = useState<IEvent[]>(() => [])
const steps = useState<IStep[]>(() => [])
const activeButton = useState<string>(() => 'all')
const url = useStrapiUrl()

useHead(() => ({ title: `Pfadi Nünenen - ${page.value?.attributes?.slug}` }))

const getPostsByStep = async (step: string) => {
  const res = await getBlogPostsByStep(step)
  posts.value = res.data
  activeButton.value = step
}

const getPosts = async () => {
  const res = await getBlogPosts()
  posts.value = res.data
  activeButton.value = 'all'
}

const fetchData = async () => {
  const response = await getPage(route.params.slug as string)
  page.value = response.data[0]

  if (hasComponent('pages.blog')) {
    await getPosts()
    const stepRes = await getStepNames()
    steps.value = stepRes.data
  }
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
.post-grid {
  display: grid;
  grid-template: auto / repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: var(--space-medium);
}

.post-grid-item:nth-child(1) {
  grid-column: 1 / -1;
}

.blog-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-medium);
  margin: var(--space-medium) 0;
  justify-content: center;

  .active {
    background-color: var(--color-accent-900);
    color: var(--color-white);
  }
}
.pfadiheim-frame {
  width: 100%;
  height: 903px;
  overflow: hidden;
  border: none;
}
.dark-mode {
  .active {
    background-color: var(--color-primary-200);
    color: var(--color-primary-800);
  }
}
.fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-medium);
  margin: var(--space-large) 0;
  img {
    width: 400px;
  }
}
</style>
