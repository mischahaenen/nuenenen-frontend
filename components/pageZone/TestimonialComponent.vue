<template>
  <section
    :class="[
      'pt-medium pb-medium full-width content-grid',
      {
        'bg-primary-50 dark:bg-primary-700': props.index % 2 === 1,
      },
    ]"
  >
    <p>{{ props.subTitle }}</p>
    <h2>{{ props.title }}</h2>
    <div class="breakout testimonial-grid">
      <article
        v-for="testimonial of props.testimonials.data"
        :key="testimonial.id"
        :class="[
          'testimonial',
          props.index % 2 === 0
            ? 'bg-primary-50 dark:bg-primary-700'
            : 'bg-white dark:bg-primary-900',
        ]"
      >
        <p class="quote">
          {{ testimonial.attributes.Quote }}
        </p>
        <div class="author">
          <NuxtImg
            format="webp"
            class="author-img"
            :src="testimonial.attributes.Image.data.attributes.url"
            :alt="
              testimonial.attributes.Image.data.attributes.alternativeText ||
              testimonial.attributes.Name
            "
          />
          <div class="name">
            <h3>{{ testimonial.attributes.Name }}</h3>
            <p>
              {{ testimonial.attributes.Position }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  testimonials: TestimonialResponse
  title: string
  subTitle: string
  index: number
}>()
</script>

<style scoped lang="scss">
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-medium);
}

.testimonial {
  padding: var(--space-medium);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-small);
}

.testimonial p {
  margin: 0;
}

.author {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--space-small);
}

.author h3 {
  margin-top: 0;
  font-size: 1rem;
}

.author img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0;
}

.prev,
.next {
  cursor: pointer;
  height: 48px;
  width: 48px;
  border: none;
  border-radius: 50%;
  background: transparent;
  svg {
    height: 36px;
    path {
      fill: var(--color-accent-900);
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.quote {
  font-size: 1.2em;
}

.quote::after,
.quote::before {
  content: '"';
  font-size: 2rem;
  font-family: 'Times New Roman', Times, serif;
}

.testimonial-position {
  font-size: 0.9em;
  margin: 0;
}
.dark-mode {
  .prev,
  .next {
    svg {
      path {
        fill: var(--color-accent-50);
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}
</style>
