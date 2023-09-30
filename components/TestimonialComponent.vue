<template>
  <div class="two-column">
    <div>
      <p>{{ props.subTitle }}</p>
      <h2>{{ props.title }}</h2>
    </div>
    <div v-if="testimonial" class="testimonial-container">
      <div class="img-container">
        <Transition mode="out-in">
          <nuxt-img
            format="webp"
            :key="testimonial.id"
            :src="testimonial.attributes.Image.data.attributes.url"
            :alt="
              testimonial.attributes.Image.data.attributes.alternativeText ||
              testimonial.attributes.Name
            "
          />
        </Transition>
        <button class="prev" aria-label="Vorheriges Bild" @click="previous()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
              d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"
            />
          </svg>
        </button>
        <button class="next" aria-label="Nächstes Bild" @click="next()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
              d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"
            />
          </svg>
        </button>
      </div>
      <Transition mode="out-in">
        <div :key="testimonial.id" class="testimonial">
          <p class="quotet-big-text">
            {{ testimonial.attributes.Quote }}
          </p>
          <p class="bold-name">{{ testimonial.attributes.Name }}</p>
          <p class="testimonial-position">
            {{ testimonial.attributes.Position }}
          </p>
        </div>
      </Transition>
    </div>
    <div v-else>
      An error occurred:
      <p>{{ testimonialIDs }}</p>
      <p>{{ useIndex }}</p>
      <p>t: {{ testimonial }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  testimonials: TestimonialResponse
  title: string
  subTitle: string
}>()
const testimonialIDs = computed(() => props.testimonials.data.map((t) => t.id))
const useIndex = useState(() => 0)
const testimonial = useState<Testimonial | null>(() => null)
const slider = useState<any>(() => null)

const fetchData = async () => {
  const id = testimonialIDs.value[useIndex.value]
  const { data, error } = await getTestimonial(id)

  if (error.value) {
    console.error(error)
  }
  if (data.value) {
    testimonial.value = data.value.data
  }
}

const startInterval = () => {
  clearInterval(slider.value)
  slider.value = setInterval(() => {
    next()
  }, 10000)
}

const next = () => {
  useIndex.value =
    useIndex.value < testimonialIDs.value.length - 1 ? useIndex.value + 1 : 0
}

const previous = () => {
  useIndex.value =
    useIndex.value > 0 ? useIndex.value - 1 : testimonialIDs.value.length - 1
}

onMounted(() => {
  fetchData()
  startInterval()
})

watch(useIndex, () => {
  fetchData()
})

watch(testimonialIDs, () => {
  fetchData()
})

onBeforeUnmount(() => {
  clearInterval(slider.value)
})
</script>

<style scoped lang="scss">
.two-column {
  display: flex;
  gap: var(--space-large);
}

.testimonial {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    text-align: left;
  }
}

.testimonial-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.img-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-left: 0;
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
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.quotet-big-text {
  font-size: 1.2em;
}
.quotet-big-text::after,
.quotet-big-text::before {
  content: '"';
  font-size: 2rem;
  font-family: 'Times New Roman', Times, serif;
}
.bold-name {
  font-weight: bold;
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
    flex-direction: column;
    gap: 0;
  }
}
</style>
