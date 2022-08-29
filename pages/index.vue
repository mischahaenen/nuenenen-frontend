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
      <div class="post-list">
        <BlogPost v-for="post in posts.data" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
useHead({ title: 'Pfadi Nünenen - Home' })
const response = await getPage('home')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = response.data[0].attributes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const posts = await getBlogPosts()
</script>
<style scoped>
.event-section {
  background-color: var(--color-grey);
  padding: var(--gap-large);
  margin-top: var(--gap-large);
}

.blog-section {
  padding: var(--gap-large);
  margin-bottom: var(--gap-large);
}

.post-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(400px, 1fr));
  grid-gap: var(--gap-medium);
}

@media (max-width: 1800px) {
  .post-list {
    grid-template-columns: repeat(3, minmax(400px, 1fr));
  }
}

@media (max-width: 1400px) {
  .post-list {
    grid-template-columns: repeat(2, minmax(400px, 1fr));
  }
}

@media (max-width: 1000px) {
  .post-list {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }
}

@media (max-width: 800px) {
  .post-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
