<template>
  <nuxt-link v-if="props.post" :to="'home/' + props.post.attributes.slug">
    <div v-if="isFirst" class="card-detailed">
      <nuxt-img
        v-if="props.post.attributes.images.data"
        provider="strapi"
        class="card-image"
        :src="
          props.post.attributes.images.data[0].attributes.formats.medium.url
        "
        :alt="props.post.attributes.images.data[0].attributes.name"
      />
      <div>
        <div class="card-content">
          <div class="card-subtitle">
            <span>{{
              moment(props.post.attributes.createdAt).format('DD. MMMM YYYY')
            }}</span>
            |
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
              >
                <path
                  d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z"
                />
              </svg>
              <span> {{ time }} {{ unit }} zum Lesen</span>
            </div>
          </div>
          <h2 class="card-title">{{ props.post.attributes.title }}</h2>
          <RichTextComponent
            :content="props.post.attributes.description"
            :is-preview="true"
            :preview-lines="9"
          />
          <div class="card-footer">
            #{{ props.post.attributes.step?.data?.attributes?.Name }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-preview">
      <div>
        <nuxt-img
          v-if="props.post.attributes.images.data"
          provider="strapi"
          class="card-image"
          :src="
            props.post.attributes.images.data[0].attributes.formats.small.url
          "
          :alt="props.post.attributes.images.data[0].attributes.name"
        />
        <div class="card-content">
          <div class="card-subtitle">
            <span>{{
              moment(props.post.attributes.createdAt).format('DD. MMMM YYYY')
            }}</span>
            |
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
              >
                <path
                  d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z"
                />
              </svg>
              <span> {{ time }} {{ unit }} zum Lesen</span>
            </div>
          </div>
          <h3 class="card-title">{{ props.post.attributes.title }}</h3>
          <RichTextComponent
            :content="props.post.attributes.description"
            :is-preview="true"
          />
          <div class="card-footer">
            #{{ props.post.attributes.step?.data?.attributes?.Name }}
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<script lang="ts" setup>
import moment from 'moment'
const props = defineProps<{ post: Post | undefined; isFirst: boolean }>()

const readingTime = (text: string) => {
  const wpm = 225
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}
const time = readingTime(props.post?.attributes?.description || '')

const unit = time === 1 ? 'Minute' : 'Minuten'
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
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
  margin: 0.5rem 0;
}

.card-subtitle {
  font-size: 0.8rem;
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  svg {
    fill: var(--color-primary-500);
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.card-footer {
  font-size: 0.8rem;
  font-weight: 100;
  color: var(--color-accent-900);
}
.card-detailed {
  display: flex;
  justify-content: space-between;
  border-radius: var(--border-radius);
  box-shadow: 0px 50px 60px rgb(0 0 0 / 10%);

  .card-image {
    width: min(100%, 400px);
    object-fit: cover;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  .card-content {
    padding: var(--space-medium);
    text-align: left;
  }

  .card-subtitle {
    justify-content: flex-start;
  }
}
.dark-mode {
  .card-detailed,
  .card-preview {
    background: var(--color-primary-800);
    box-shadow: 0px 50px 60px var(--color-primary-600);
  }
  .card-subtitle {
    color: var(--color-white);
  }

  svg {
    fill: var(--color-white);
  }

  .card-footer {
    color: var(--color-accent-50);
  }
}

@media screen and (max-width: 768px) {
  .card-detailed {
    flex-direction: column;
    .card-image {
      width: min(100%, 400px);
      border-radius: var(--border-radius) var(--border-radius) 0 0;
    }
  }
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
