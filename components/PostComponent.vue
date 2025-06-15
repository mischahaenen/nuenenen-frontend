<template>
  <NuxtLink
    v-if="post"
    :to="`/blog/${post.slug}`"
    class="post-link"
    :aria-label="`Artikel lesen: ${post.title}`"
  >
    <article :class="cardClasses">
      <div class="card-image-wrapper">
        <NuxtImg
          v-if="post.images?.length"
          class="card-image"
          format="webp"
          provider="strapi"
          :src="post.images[0].hash + post.images[0].ext"
          :alt="
            post.images[0].alternativeText ||
            post.images[0].name ||
            `Bild für ${post.title}`
          "
          :sizes="imageSizes"
          :loading="isFirst ? 'eager' : 'lazy'"
          :fetchpriority="isFirst ? 'high' : 'auto'"
        />
        <div v-else class="card-image-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"
            />
          </svg>
        </div>
      </div>

      <div class="card-content">
        <header class="card-header">
          <div class="card-meta">
            <time :datetime="formattedDateISO" class="card-date">
              {{ formattedDate }}
            </time>
            <span class="meta-separator">|</span>
            <ReadingTime :time="readingTime" :unit="timeUnit" class="reading-time" />
          </div>

          <h2 class="card-title">{{ post.title }}</h2>
        </header>

        <div class="card-description">
          <RichTextComponent
            :content="post.description"
            :is-preview="true"
            :preview-lines="isFirst ? 4 : 3"
          />
        </div>

        <footer v-if="post.step" class="card-footer">
          <span class="card-tag">#{{ post.step.Name }}</span>
        </footer>
      </div>
    </article>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { Post } from "~/types/post";

const props = defineProps<{
  post: Post | undefined;
  isFirst: boolean;
}>();

const { post, isFirst } = toRefs(props);

const formattedDate = computed(() => {
  if (!post.value?.createdAt) return "";

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(post.value.createdAt));
});

const formattedDateISO = computed(() => {
  if (!post.value?.createdAt) return "";

  const date =
    typeof post.value.createdAt === "string"
      ? new Date(post.value.createdAt)
      : post.value.createdAt;

  return date.toISOString();
});

const { calculateBlocksReadingTime } = useReadingTime();

const readingTime = computed(() => {
  if (!post.value?.description) return 1;
  return calculateBlocksReadingTime(post.value.description);
});

const timeUnit = computed(() => (readingTime.value === 1 ? "Minute" : "Minuten"));

const cardClasses = computed(() => ({
  card: true,
  "card--featured": isFirst.value,
  "card--preview": !isFirst.value,
}));

const imageSizes = computed(() =>
  isFirst.value
    ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
    : "(max-width: 768px) 100vw, 350px"
);
</script>

<style scoped lang="scss">
.post-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;

  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
    border-radius: var(--border-radius);
  }
}

// Light mode styles (default)
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

    .card-image {
      transform: scale(1.03);
    }
  }

  &--featured {
    @media (min-width: 769px) {
      flex-direction: row;

      .card-image-wrapper {
        flex: 1;
        max-width: 50%;
      }

      .card-content {
        flex: 1;
        padding: var(--space-large);
      }
    }
  }
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
  background: var(--color-grey);

  .card--featured & {
    aspect-ratio: 16/10;
  }

  .card--preview & {
    aspect-ratio: 16/9;
  }
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--color-grey-dark);
  background: var(--color-grey);
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-medium);
  gap: var(--space-small);
}

.card-header {
  .card--featured & {
    margin-bottom: var(--space-small);
  }
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-primary-600);
  margin-bottom: 0.5rem;
}

.meta-separator {
  opacity: 0.7;
  color: var(--color-primary-400);
}

.card-title {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  color: var(--color-accent-900);
  font-family: var(--font-heading);

  .card--featured & {
    font-size: clamp(1.25rem, 4vw, 2rem);
  }
}

.card-description {
  flex: 1;
  color: var(--color-primary-800);
  line-height: 1.5;

  :deep(p) {
    margin-bottom: 0.5rem;
    color: var(--color-primary-800);

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.card-footer {
  margin-top: auto;
  padding-top: var(--space-small);
}

.card-tag {
  display: inline-block;
  padding: 0.5rem var(--space-small);
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: calc(var(--border-radius) / 2);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary-200);
    transform: translateY(-1px);
  }
}

// Dark mode styles
.dark-mode .card {
  background: var(--color-primary-800);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
  }

  .card-image-wrapper {
    background: var(--color-primary-600);
  }

  .card-image-placeholder {
    background: var(--color-primary-600);
    color: var(--color-primary-200);
  }

  .card-meta {
    color: var(--color-primary-200);
  }

  .meta-separator {
    color: var(--color-primary-300);
  }

  .card-title {
    color: var(--color-white);
  }

  .card-description {
    color: var(--color-white);

    :deep(p) {
      color: var(--color-white);
    }
  }

  .card-tag {
    background: var(--color-accent-800);
    color: var(--color-accent-100);

    &:hover {
      background: var(--color-accent-700);
      color: var(--color-white);
    }
  }
}

// Mobile optimizations
@media screen and (max-width: 768px) {
  .card-content {
    padding: var(--space-medium);
  }

  .card-title {
    font-size: clamp(1rem, 4vw, 1.25rem);
  }

  .card--featured .card-title {
    font-size: clamp(1.125rem, 5vw, 1.5rem);
  }
}

// Responsive improvements
@media screen and (max-width: 480px) {
  .card-content {
    padding: var(--space-small);
    gap: 0.75rem;
  }

  .card-meta {
    font-size: 0.8rem;
    gap: 0.25rem;
  }
}
</style>
