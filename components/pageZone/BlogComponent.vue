<template>
  <section
    :class="[
      'pt-medium pb-medium',
      {
        'full-width content-grid bg-primary-50 dark:bg-primary-700':
          props.index % 2 === 1,
      },
    ]"
  >
    <TitleComponent
      :title="props.zone.Title"
      :index="props.index"
    ></TitleComponent>
    <RichTextComponent :content="props.zone.Description" />
    <div class="blog-filter">
      <button
        class="btn btn-accent"
        :class="{ active: activeButton === 'all' }"
        aria-label="Alle Posts anzeigen"
        @click="getPosts()"
      >
        Alle
      </button>
      <button
        v-for="(step, jndex) of steps"
        :key="jndex"
        class="btn btn-accent"
        :class="{ active: activeButton === step.attributes.Name }"
        :aria-label="`Posts für die ${step.attributes.Name} anzeigen`"
        @click="getPostsByStep(step.attributes.Name)"
      >
        {{ step.attributes.Name }}
      </button>
    </div>
    <div v-if="posts.length" class="breakout post-grid wrapper">
      <PostComponent
        v-if="posts.at(0)"
        :key="posts.at(0)?.id"
        :post="posts.at(0)"
        :is-first="true"
        class="post-grid-item"
      />
      <div class="grid left">
        <PostComponent
          v-for="post in posts.filter((_, i) => i % 2 !== 0 && i !== 0)"
          :key="post.id"
          :post="post"
          :is-first="false"
          class="post-grid-item"
        />
      </div>
      <div class="grid right">
        <PostComponent
          v-for="post in posts.filter((_, i) => i % 2 === 0 && i !== 0)"
          :key="post.id"
          :post="post"
          :is-first="false"
          class="post-grid-item"
        />
      </div>
    </div>
    <div v-else class="fallback">
      <p>Hier wurde noch nichts veröffentlicht.</p>
      <NuxtImg
        src="/svg/not_found.svg"
        alt="Illustration of an alien indicating that nothing has been found"
        format="webp"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
/* TODO: Rethink subgrid strategy */
const posts = useState<Post[]>(() => [])
const steps = useState<Step[]>(() => [])
const activeButton = useState<string>(() => 'all')
const props = defineProps<{
  zone: BlogZone
  index: number
}>()

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

const fetchSteps = async () => {
  const res = await getStepNames()
  steps.value = res.data
}

const initializeObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('post-grid-item--hidden')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.5,
    }
  )

  document.querySelectorAll('.post-grid-item').forEach((item) => {
    item.classList.add('post-grid-item--hidden')
    observer.observe(item)
  })
}

onMounted(async () => {
  await getPosts()
  await fetchSteps()

  initializeObserver()
})
</script>
<style scoped lang="scss">
.post-grid.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--space-medium);
}

.grid.left,
.grid.right {
  display: grid;
  grid-gap: var(--space-medium);
  grid-auto-rows: min-content;
}
.post-grid-item {
  opacity: 1;
  transform: translateX(0);
  transform: translateY(0);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.grid.left {
  grid-column: 1 / span 1;
  .post-grid-item--hidden {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }
}

.grid.right {
  grid-column: span 1 / -1;
  .post-grid-item--hidden {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }
}

.post-grid-item:nth-child(1) {
  grid-column: 1 / -1;
}
.post-grid-item--hidden:nth-child(1) {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.blog-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-small);
  margin: var(--space-medium) 0;
  justify-content: flex-start;

  .active {
    background-color: var(--color-accent-900);
    color: var(--color-white);
  }
}

.dark-mode {
  .active {
    background-color: var(--color-accent-700);
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

@media screen and (max-width: 768px) {
  .post-grid.wrapper {
    grid-template-columns: 1fr;
  }

  .blog-filter {
    gap: var(--space-small);
  }
}
</style>
