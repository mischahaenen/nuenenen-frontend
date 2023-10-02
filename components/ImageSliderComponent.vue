<template>
  <carousel v-if="props.images.length > 1" :autoplay="3000" :wrap-around="true">
    <slide v-for="image in props.images" :key="image.attributes.name">
      <div class="carousel__item">
        <nuxt-img
          format="webp"
          class="carousel__image"
          :src="image.attributes.url"
          :alt="image.attributes.alternativeText || image.attributes.name"
        >
        </nuxt-img>
      </div>
    </slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </carousel>
  <nuxt-img
    v-else
    format="webp"
    class="carousel__image_standalone"
    :src="props.images[0].attributes.url"
    :alt="
      props.images[0].attributes.alternativeText ||
      props.images[0].attributes.name
    "
  ></nuxt-img>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
const props = defineProps<{
  images: Image[]
}>()
</script>
<style lang="scss">
.carousel__image_standalone {
  max-height: 400px;
  width: 100%;
  object-fit: contain;
  border-radius: var(--border-radius);
}
.carousel__image {
  max-height: 500px;
  width: 100%;
  object-fit: contain;
}
.carousel__item {
  max-height: 500px;
  width: 100%;
  background-color: var(--color-primary-50);
  border-radius: var(--border-radius);
}

.carousel__slide {
  padding: 10px;
  width: 100% !important;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border-radius: 50%;
  background-color: var(--color-primary-50);
}

.dark-mode {
  .carousel__item {
    background-color: var(--color-primary-800);
    color: var(--vc-clr-white);
  }

  .carousel__prev,
  .carousel__next {
    color: var(--color-white);
    background-color: var(--color-primary-800);
  }

  .carousel__pagination-button::after {
    background-color: var(--color-white);
  }
  .carousel__pagination-button--active::after {
    background-color: var(--color-primary-100);
  }
}
</style>
