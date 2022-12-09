<template>
  <div class="container">
    <ImageSlider :images="post.data[0].attributes.images"></ImageSlider>
    <h1>{{ post.data[0].attributes.title }}</h1>
    <div class="subtitle">
      <img
        src="../../assets/svg/undraw_studying_re_deca.svg"
        alt="Default Author image"
      />
      <div>
        <strong>Author Name</strong>
        <p>
          {{
            moment(post.data[0].attributes.createdAt)
              .locale('de-ch')
              .startOf('day')
              .fromNow()
          }}
        </p>
      </div>
    </div>
    <h3>#{{ post.data[0].attributes.step }}</h3>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="content"></div>
  </div>
</template>
<script lang="ts" setup>
import editorjsHTML from 'editorjs-html'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment'
const route = useRoute()
const post = await getBlogPost(route.params.slug as string)
// navigate to 404 page when no slug is found
if (!post.data) await navigateTo('/not-found')
useHead({
  title: `Pfadi Nünenen - ${post.data[0].attributes.title}`,
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const content = computed(() => {
  const edjsParser = editorjsHTML()
  const cleanData = JSON.parse(post.data[0].attributes.description)
  const htmlArray: string[] = edjsParser.parseStrict(cleanData)
  return htmlArray.join('')
})
</script>
<style scoped lang="scss">
.container {
  margin: 6rem auto var(--space-large) auto;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .subtitle {
    display: flex;
    align-items: center;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-right: var(--space-small);
    }
    p {
      margin: 0;
    }
  }

  h3 {
    margin: var(--space-medium) 0 0 0;
    font-weight: 300;
    color: var(--color-accent-500);
  }
}
</style>
