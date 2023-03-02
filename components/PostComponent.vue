<template>
  <nuxt-link :to="'home/' + props.post.attributes.slug">
    <div v-if="isFirst" class="card-detailed">
      <img
        v-if="props.post.attributes.images.data"
        class="card-image"
        :src="
          url +
          props.post.attributes.images.data[0].attributes.formats.large.url
        "
        :alt="props.post.attributes.images.data[0].attributes.name"
      />
      <div>
        <div class="card-content">
          <div class="card-footer">
            #{{ props.post.attributes.step.data.attributes.Name }}
          </div>
          <h2 class="card-title">{{ props.post.attributes.title }}</h2>
          <div class="card-subtitle">
            <!-- <span>{{
              $moment(props.post.attributes.createdAt).format('DD. MMMM YYYY')
            }}</span> -->
            |
            <span>{{ time }} {{ unit }} zum Lesen</span>
          </div>
          <RichTextComponent
            :content="props.post.attributes.description"
            :is-preview="true"
            :preview-lines="9"
          />
        </div>
      </div>
    </div>
    <div v-else class="card-preview">
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
            <span>{{
              moment(props.post.attributes.createdAt).format('DD. MMMM YYYY')
            }}</span>
            |
            <span>{{ time }} {{ unit }} zum Lesen</span>
          </div>
          <RichTextComponent
            :content="props.post.attributes.description"
            :is-preview="true"
          />
        </div>
      </div>
      <div class="card-footer">
        #{{ props.post.attributes.step.data.attributes.Name }}
      </div>
    </div>
  </nuxt-link>
</template>
<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment'
const url = useStrapiUrl()
const props = defineProps<{ post: IPost; isFirst: boolean }>()

const readingTime = (text: string) => {
  const wpm = 225
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}
const time = readingTime(props.post.attributes.description)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unit = time === 1 ? 'Minute' : 'Minuten'
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
}

.card-detailed {
  display: flex;
  justify-content: space-between;
  border-radius: var(--border-radius);
  box-shadow: 0px 50px 60px rgb(0 0 0 / 10%);

  .card-image {
    max-width: 50%;
    object-fit: cover;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
  .card-content {
    padding: var(--space-medium);
  }

  .card-footer {
    padding: 0;
  }
}
.card-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--border-radius);
  box-shadow: 0px 50px 60px rgb(0 0 0 / 10%);
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
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

.card-footer {
  font-size: 0.8rem;
  color: var(--color-accent-900);
  padding: var(--space-small);
}

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
