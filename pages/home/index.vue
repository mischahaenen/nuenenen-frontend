<template>
  <div>
    <BaseBanner :title="page.title" :description="page.description" />
    <div
      v-for="(zone, index) in page.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'colored-section' : 'section'"
    >
      <div class="container">
        <h2 v-if="index % 2 !== 0">{{ zone.Title }}</h2>
        <ColoredTitleComponent v-else :title="zone.Title" />
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />
        <div v-if="zone.__component === 'pages.blog'">
          <div class="blog-filter">
            <button
              :class="{ active: activeButton === 'all' }"
              @click="getPosts()"
            >
              Alle
            </button>
            <button
              v-for="(step, jndex) of steps"
              :key="jndex"
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
              src="../../assets/svg/not_found.svg"
              alt="Space Aliens nothing found image"
            />
          </div>
        </div>
        <div v-if="zone.__component === 'pages.event'">
          <EventComponent
            v-for="event in events"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const response = await getPage('home')
const page = response.data[0].attributes
const posts = useState<IPost[]>(() => [])
const events = useState<IEvent[]>(() => [])
const steps = useState<IStep[]>(() => [])
const activeButton = useState<string>(() => 'all')
useHead({ title: `Pfadi Nünenen - ${page.slug}` })

const getPosts = async () => {
  const res = await getBlogPosts()
  posts.value = res.data
  activeButton.value = 'all'
}
const getPostsByStep = async (step: string) => {
  const res = await getBlogPostsByStep(step)
  posts.value = res.data
  activeButton.value = step
}
if (page.pageZone.some((zone) => zone.__component === 'pages.blog')) {
  await getPosts()
  const stepRes = await getStepNames()
  steps.value = stepRes.data
}
if (page.pageZone.some((zone) => zone.__component === 'pages.event')) {
  const res = await getEvents()
  events.value = res.data
}
</script>
<style scoped lang="scss">
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

  button {
    background: var(--color-white);
    color: var(--color-accent-900);
    border: none;
    padding: var(--space-small);
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    outline-color: var(--color-accent-900);

    &:hover {
      background-color: var(--color-accent-50);
      color: var(--color-accent-900);
    }
  }

  .active {
    background-color: var(--color-accent-900);
    color: var(--color-white);
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
