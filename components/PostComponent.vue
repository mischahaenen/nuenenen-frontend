<template>
  <nuxt-link v-if="post" :to="'blog/' + post.attributes.slug">
    <div :class="cardClass">
      <NuxtImg
        v-if="post.attributes.images?.data?.length"
        class="card-image"
        :src="post.attributes.images.data[0].attributes.url"
        :alt="
          post.attributes.images.data[0].attributes.alternativeText ||
          post.attributes.images.data[0].attributes.name
        "
        format="webp"
      />
      <div class="card-content">
        <div class="card-subtitle">
          <span>{{ formattedDate }}</span> |
          <ReadingTime :time="readingTime" :unit="timeUnit" />
        </div>
        <h2>{{ post.attributes.title }}</h2>
        <RichTextComponent
          :content="post.attributes.description"
          :is-preview="true"
          :preview-lines="isFirst ? 9 : undefined"
        />
        <div v-if="post.attributes.step.data" class="card-footer">
          #{{ post.attributes.step?.data?.attributes?.Name }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<script lang="ts" setup>
import moment from 'moment'

const props = defineProps<{
  post: Post | undefined
  isFirst: boolean
}>()
const { post, isFirst } = toRefs(props)

const formattedDate = computed(() =>
  moment(post.value?.attributes.createdAt).format('DD. MMMM YYYY')
)

const readingTime = computed(() => {
  const wpm = 225
  const words =
    post.value?.attributes.description.trim().split(/\s+/).length || 0
  return Math.ceil(words / wpm)
})

const timeUnit = computed(() =>
  readingTime.value === 1 ? 'Minute' : 'Minuten'
)

const cardClass = computed(() =>
  isFirst.value ? 'card-detailed' : 'card-preview'
)
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
  color: inherit;
}

.card-detailed,
.card-preview {
  transition: all 0.2s ease-in-out;
  border-radius: var(--border-radius);
  box-shadow: 0px 50px 60px rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.card-detailed:hover,
.card-preview:hover {
  box-shadow: 0px 50px 60px rgb(0 0 0 / 20%);

  .card-image {
    transform: scale(1.05);
  }
}

.card-image {
  width: min(100%, 500px);
  height: auto;
  object-fit: cover;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  transition: transform 0.2s ease-in-out;
}

.card-detailed {
  flex-direction: row;
  justify-content: space-between;
  .card-image {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }
}

.card-preview {
  .card-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }
}

.card-content {
  padding: var(--space-medium);
  text-align: left;
}

.card-subtitle {
  font-size: 0.8rem;
  display: flex;
  gap: 10px;
}

.card-subtitle,
.card-footer {
  color: var(--color-accent-800);
}

.dark-mode {
  .card-detailed,
  .card-preview {
    box-shadow: 0px 50px 60px rgba(255, 255, 255, 0.1);
  }

  .card-detailed:hover,
  .card-preview:hover {
    box-shadow: 0px 50px 60px rgba(255, 255, 255, 0.2);
  }

  .card-subtitle,
  .card-footer {
    color: var(--color-accent-50);
  }
}

@media screen and (max-width: 768px) {
  .card-detailed {
    flex-direction: column;
    .card-image {
      width: 100%;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
    }
  }
}
</style>
