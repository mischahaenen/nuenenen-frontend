<template>
  <div>
    <div class="blog-filter">
      <button
        class="button accent-button"
        :class="{ active: activeButton === 'all' }"
        aria-label="Show all posts"
        @click="getPosts()"
      >
        Alle
      </button>
      <button
        v-for="(step, jndex) of steps"
        :key="jndex"
        class="button accent-button"
        :class="{ active: activeButton === step.attributes.Name }"
        :aria-label="'Show posts for ' + step.attributes.Name"
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
      <nuxt-img
        src="/svg/not_found.svg"
        alt="Illustration of an alien indicating that nothing has been found"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const posts = useState<IPost[]>(() => [])
const steps = useState<IStep[]>(() => [])
const activeButton = useState<string>(() => 'all')

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

onMounted(async () => {
  await getPosts()
  await fetchSteps()
})
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

  .active {
    background-color: var(--color-accent-900);
    color: var(--color-white);
  }
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

@media screen and (max-width: 600px) {
  .post-grid {
    grid-template-columns: 1fr;
  }

  .blog-filter {
    flex-direction: column;
  }
}
</style>
