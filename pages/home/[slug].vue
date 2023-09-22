<template>
  <div v-if="postData" class="container">
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
    <ImageSliderComponent :images="postData.images.data"></ImageSliderComponent>
    <h1>{{ postData.title }}</h1>
    <RichTextComponent :content="postData.description" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const post = useState<PostResponse | null>(() => null)
const postData = computed(() => post.value?.data[0].attributes || null)

const fetchData = async () => {
  try {
    post.value = await getBlogPost(route.params.slug as string)
    if (!post.value.data) throw new Error('No post found')
  } catch (error) {
    await navigateTo('/not-found')
  }
}

onMounted(fetchData)

watch(() => route.params.slug, fetchData)

useHead({
  title: `Pfadi Nünenen - ${postData.value?.title || 'Not found'}`,
})

onUnmounted(() => {
  post.value = null
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
}

.back-link svg {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
