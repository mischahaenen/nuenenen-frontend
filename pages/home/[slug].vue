<template>
  <div v-if="postData" class="container">
    <ImageSliderComponent :images="postData.images.data"></ImageSliderComponent>
    <h1>{{ postData.title }}</h1>
    <h3>
      {{ postData.step.data.attributes.Name }} -
      <span>
        {{ moment(postData.createdAt).locale('de').startOf('day').fromNow() }}
      </span>
    </h3>
    <RichTextComponent :content="postData.description" />
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment'

const route = useRoute()
const post = useState<IPosts | null>(() => null)
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
