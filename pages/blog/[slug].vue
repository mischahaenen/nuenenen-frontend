<template>
  <main v-if="postData" class="content-grid container">
    <template v-if="pending"></template>
    <template v-if="error"><p>Something went wrong</p></template>
    <template v-if="postData">
      <div class="full-width-image">
        <ImageSliderComponent
          :images="postData.images.data"
        ></ImageSliderComponent>
      </div>
      <NuxtLink to="/" class="back-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Zurück
      </NuxtLink>
      <article>
        <h1>{{ postData.title }}</h1>
        <RichTextComponent :content="postData.description" />
      </article>
    </template>
  </main>
</template>

<script lang="ts" setup>
const route = useRoute()
const postData = computed(() => post.value?.data[0].attributes || null)

const {
  data: post,
  pending,
  error,
} = await useAsyncData('post', () => getBlogPost(route.params.slug as string))

useHead({
  title: `Pfadi Nünenen - ${postData.value?.title || ''}`,
})
</script>

<style scoped lang="scss">
.container {
  margin: 6rem auto var(--space-large) auto;

  h3 {
    margin: var(--space-medium) 0 0 0;
    font-weight: 300;
  }
}
.back-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 2rem;
}

.back-link svg {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
