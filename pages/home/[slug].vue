<template>
  <div v-if="post.data" class="container">
    <ImageSliderComponent
      :images="post.data[0].attributes.images.data"
    ></ImageSliderComponent>
    <h1>{{ post.data[0].attributes.title }}</h1>
    <p>
      {{
        moment(post.data[0].attributes.createdAt)
          .locale('de')
          .startOf('day')
          .fromNow()
      }}
    </p>
    <h3>#{{ post.data[0].attributes.step.data.attributes.Name }}</h3>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <RichTextComponent :content="post.data[0].attributes.description" />
  </div>
</template>
<script lang="ts" setup>
import moment from 'moment'
const route = useRoute()
const post = await getBlogPost(route.params.slug as string)
// navigate to 404 page when no slug is found
if (!post.data) await navigateTo('/not-found')
useHead({
  title: `Pfadi Nünenen - ${post.data[0].attributes.title}`,
})
</script>
<style scoped lang="scss">
.container {
  margin: 6rem auto var(--space-large) auto;

  h3 {
    margin: var(--space-medium) 0 0 0;
    font-weight: 300;
    color: var(--color-accent-900);
  }
}
</style>
