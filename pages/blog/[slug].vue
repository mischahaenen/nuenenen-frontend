<template>
  <main v-if="post" class="content-grid container">
    <template v-if="error"><p>Something went wrong</p></template>
    <template v-if="post">
      <div class="full-width-image">
        <ImageSliderComponent :images="post[0].images"></ImageSliderComponent>
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
        <h1>{{ post[0].title }}</h1>
        <RichTextComponent :content="post[0].description" />
      </article>
    </template>
  </main>
</template>

<script lang="ts" setup>
import { useBlogApi } from "~/composables/api/modules/blog";

const route = useRoute();
const { getBlogPost } = useBlogApi();

const { data: post, error } = await useAsyncData("post", () =>
  getBlogPost(route.params.slug as string)
);
const title = computed(() => {
  if (!post.value || !post.value || post.value.length === 0) return "Pfadi Nünenen";
  return `Pfadi Nünenen - ${
    post.value[0].slug.charAt(0).toUpperCase() + post.value[0].slug.slice(1)
  }`;
});

useHead({
  title: title.value,
});
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
