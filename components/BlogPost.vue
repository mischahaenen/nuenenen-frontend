<template>
  <!-- Create Card -->
  <div class="card">
    <div>
      <img
        v-if="props.post.attributes.images.data"
        class="card-image"
        :src="
          url +
          props.post.attributes.images.data[0].attributes.formats.small.url
        "
        :alt="props.post.attributes.images.data[0].attributes.name"
      />
      <div class="card-content">
        <h3 class="card-title">{{ props.post.attributes.title }}</h3>
        <div class="card-subtitle">
          <span>{{ props.post.attributes.author }}</span>
          <span>{{
            moment(props.post.attributes.createdAt)
              .locale('de-ch')
              .startOf('day')
              .fromNow()
          }}</span>
        </div>
        <div v-html="content"></div>
      </div>
    </div>
    <div class="cad-footer">#{{ props.post.attributes.step }}</div>
  </div>
</template>
<script lang="ts" setup>
import editorjsHTML from 'editorjs-html'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const url = useStrapiUrl()
const props = defineProps<{ post: IPost }>()
const content = ref('')
onMounted(() => {
  const edjsParser = editorjsHTML()
  const cleanData = JSON.parse(props.post.attributes.description)
  const htmlArray: string[] = edjsParser.parseStrict(cleanData)
  content.value = htmlArray.find((item) => item.includes('<p>')) || ''
})
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background-color: var(--color-grey);
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  padding: var(--gap-medium);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-contrast-1);
}

h3 {
  margin: 0 0 0.5rem;
}

.cad-footer {
  font-size: 0.8rem;
  color: var(--color-accent);
  margin-top: var(--gap-medium);
  padding: var(--gap-medium);
}
</style>
