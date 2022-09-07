<template>
  <div>
    <BaseBanner :title="page.title" :description="page.description" />
    <div class="event-section container">
      <h2>Nächste Events</h2>
      <EventList />
    </div>
    <div class="blog-section container">
      <h2>Aktuelles</h2>
      <BlogFilter />
      <div :class="isGridView ? 'post-grid' : 'post-list'">
        <BlogPost v-for="post in posts.data" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePostStore } from '~~/store/post'
useHead({ title: 'Pfadi Nünenen - Home' })
const response = await getPage('home')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = response.data[0].attributes
const postStore = await usePostStore()
await postStore.fetchAllPosts()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const posts = computed(() => postStore.posts)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isGridView = useState('isGridView')
</script>
<style scoped lang="scss">
.event-section {
  background-color: var(--color-grey);
  padding: var(--space-large);
  margin-top: var(--space-large);
}

.blog-section {
  padding: var(--space-large);
  margin-bottom: var(--space-large);
}

.post-grid {
  display: grid;
  grid-template: auto / repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: var(--space-medium);
}
.post-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-medium);
}

// TODO: Use scss variables when issue is fixed: https://github.com/nuxt/framework/issues/4269
@media screen and (max-width: 1024px) {
  .event-section {
    padding: var(--space-small);
    margin-top: var(--space-small);
  }

  .blog-section {
    padding: var(--space-small);
    margin-bottom: var(--space-small);
  }

  .post-grid {
    grid-gap: var(--space-small);
  }
  .post-list {
    gap: var(--space-small);
  }
}
</style>
