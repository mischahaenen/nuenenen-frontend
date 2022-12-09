<template>
  <nuxt-link :to="'home/' + props.post.attributes.slug">
    <div v-if="isGridView" class="card-grid">
      <div>
        <img
          v-if="props.post.attributes.images.data"
          class="card-image-grid"
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
      <div class="card-footer-grid">#{{ props.post.attributes.step }}</div>
    </div>
    <div v-else>
      <div class="card-list">
        <div>
          <img
            v-if="props.post.attributes.images.data"
            class="card-image-list"
            :src="
              url +
              props.post.attributes.images.data[0].attributes.formats.small.url
            "
            :alt="props.post.attributes.images.data[0].attributes.name"
          />
        </div>
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
          <div class="card-footer-list">#{{ props.post.attributes.step }}</div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<script lang="ts" setup>
import editorjsHTML from 'editorjs-html'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const url = useStrapiUrl()
const props = defineProps<{ post: IPost }>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const content = computed(() => {
  const edjsParser = editorjsHTML()
  const cleanData = JSON.parse(props.post.attributes.description)
  const htmlArray: string[] = edjsParser.parseStrict(cleanData)
  return (
    htmlArray.find((item) => item.includes('<p>'))?.slice(0, 200) + '...' || ''
  )
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isGridView = useState('isGridView')
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
}
.card-grid {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--border-radius);
  background-color: var(--color-grey);
}
.card-list {
  display: flex;
  flex-direction: row;
  gap: var(--space-small);
  border-radius: var(--border-radius);
  background-color: var(--color-grey);
}

.card-image-grid {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}
.card-image-list {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.card-content {
  display: flex;
  flex-direction: column;
  padding: var(--space-small);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-dark);
}

h3 {
  margin: 0 0 0.5rem;
}

.card-footer-grid {
  font-size: 0.8rem;
  color: var(--color-accent-900);
  padding: var(--space-small);
}

.card-footer-list {
  font-size: 0.8rem;
  color: var(--color-accent-900);
}
// TODO: Use scss variables when issue is fixed: https://github.com/nuxt/framework/issues/4269
@media screen and (max-width: 1024px) {
  .card-image-list {
    display: none;
  }

  .card-content {
    padding: var(--space-small);
  }

  .card-footer-grid {
    padding: var(--space-small);
  }
}
</style>
