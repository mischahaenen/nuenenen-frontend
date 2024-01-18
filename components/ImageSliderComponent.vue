<template>
  <carousel
    v-if="props.images && props.images.length > 1"
    :autoplay="3000"
    :wrap-around="true"
  >
    <slide v-for="image in props.images" :key="image.attributes.name">
      <div class="carousel__item">
        <NuxtImg
          format="webp"
          provider="strapi"
          class="carousel__image"
          :src="image.attributes.hash + image.attributes.ext"
          :alt="image.attributes.alternativeText || image.attributes.name"
          sizes="100vw sm:50vw md:400px"
        >
        </NuxtImg>
      </div>
    </slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </carousel>
  <NuxtImg
    v-if="props.images && props.images.length === 1"
    class="carousel__image"
    format="webp"
    provider="strapi"
    :src="props.images[0].attributes.hash + props.images[0].attributes.ext"
    :alt="
      props.images[0].attributes.alternativeText ||
      props.images[0].attributes.name
    "
    sizes="100vw sm:50vw md:400px"
  ></NuxtImg>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
const props = defineProps<{
  images: Image[] | null
}>()
</script>
<style lang="scss">
.carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75vh;
  background: var(--color-accent-900);
}

.carousel__image {
  width: 100%;
  max-height: 75vh;
  object-fit: contain;
  background: var(--color-accent-900);
}

.carousel__prev,
.carousel__next {
  width: 3rem;
  height: 3rem;
  box-sizing: content-box;
  border-radius: 50%;
  background-color: var(--color-white);
  color: var(--color-primary-900);
  transition: background-color 0.2s ease-in-out;
}

.carousel__prev:hover,
.carousel__next:hover {
  background-color: var(--color-primary-50);
  color: var(--color-primary-800);
}

.carousel__pagination {
  background-color: var(--color-white);
  padding: 0.5rem;
  border-radius: 50px;
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
}

.carousel__pagination-button::after {
  display: block;
  content: '';
  width: 2rem;
  height: 0.75rem;
  border-radius: 50px;
  background-color: var(--color-primary-50);
}

.carousel__pagination-button:hover::after {
  background-color: var(--color-primary-100);
}

.carousel__pagination-button--active::after {
  background-color: var(--color-primary-900);
}

.dark-mode {
  .carousel__item,
  .carousel__image {
    background: var(--color-primary-900);
  }
  .carousel__prev,
  .carousel__next {
    color: var(--color-white);
    background-color: var(--color-accent-700);
  }
  .carousel__prev:hover,
  .carousel__next:hover {
    color: var(--color-white);
    background-color: var(--color-accent-600);
  }
  .carousel__pagination {
    background-color: var(--color-primary-900);
  }

  .carousel__pagination-button::after {
    background-color: var(--color-accent-100);
  }
  .carousel__pagination-button:hover::after {
    background-color: var(--color-accent-600);
  }

  .carousel__pagination-button--active::after {
    background-color: var(--color-accent-700);
  }
}

@media (max-width: 768px) {
  .carousel__pagination-button::after {
    display: none;
  }
}
</style>
