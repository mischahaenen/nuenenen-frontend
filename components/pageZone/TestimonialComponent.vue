<template>
  <section
    :class="[
      'pt-medium pb-medium full-width content-grid',
      {
        'bg-accent-50 dark:bg-primary-700': props.index % 2 === 1,
      },
    ]"
  >
    <p>{{ props.subTitle }}</p>
    <h2>{{ props.title }}</h2>
    <div class="breakout testimonials">
      <article
        v-for="testimonial of props.testimonials.data"
        :key="testimonial.id"
        :class="[
          'testimonial',
          props.index % 2 === 0
            ? 'bg-accent-50 dark:bg-primary-700'
            : 'bg-white dark:bg-primary-900',
        ]"
      >
        <p class="quote">
          {{ testimonial.attributes.Quote }}
        </p>
        <div class="author">
          <NuxtImg
            v-if="testimonial.attributes.Image?.data"
            class="author-img"
            format="webp"
            provider="strapi"
            :src="
              testimonial.attributes.Image.data.attributes.hash +
              testimonial.attributes.Image.data.attributes.ext
            "
            :alt="
              testimonial.attributes.Image.data.attributes.alternativeText ||
              testimonial.attributes.Name
            "
            sizes="100vw sm:50vw md:400px"
            :modifiers="{ breakpoint: 'small' }"
          />
          <NuxtImg
            v-else
            class="author-img"
            format="webp"
            src="svg/female_avatar.svg"
            alt="Placeholder"
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

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
        observer.unobserve(entry.target)
      }
    })
  })

  document.querySelectorAll('.testimonial').forEach((ref) => {
    observer.observe(ref)
  })
})
</script>

<style scoped lang="scss">
.testimonials {
  display: flex;
  gap: var(--space-medium);
  flex-wrap: wrap;
  justify-content: center;
}

.testimonial {
  padding: var(--space-medium);
  border-radius: var(--border-radius);
  display: flex;
  gap: var(--space-small);
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
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

@media screen and (max-width: 1024px) {
  .testimonial {
    flex-direction: column;
  }
}

@media screen and (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}
</style>
