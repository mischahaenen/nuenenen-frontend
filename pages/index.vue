<template>
  <div>
    <BaseBanner />
    <div class="event-section container">
      <h2>Nächste Events</h2>
      <EventList />
    </div>
    <div class="blog-section container">
      <h2>Aktuelles</h2>
      <BlogFilter />
      <BlogEntry />
    </div>
  </div>
</template>
<script lang="ts" setup>
useHead({ title: 'Pfadi Nünenen - Home' })
const response = await getPage('home')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = response.data[0].attributes
</script>
<style scoped>
.event-section {
  background-color: var(--color-grey);
  padding: var(--gap-large);
}

.blog-section {
  padding: var(--gap-large);
}
</style>
