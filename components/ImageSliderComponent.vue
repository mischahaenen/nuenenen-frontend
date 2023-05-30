<template>
  <div v-if="imageStore.getImages.length" class="slider">
    <div class="slide">
      <img
        class="fade active-slide"
        :src="useStrapiUrl() + getImageUrl()"
        :alt="imageStore.getCurrentSlide.attributes.alternativeText"
      />
      <button
        class="prev"
        aria-label="Previous Image"
        :disabled="imageStore.getCurrentIndex === 0"
        @click="slide(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z" />
        </svg>
      </button>
      <button
        class="next"
        aria-label="Next Image"
        :disabled="
          imageStore.getCurrentIndex === imageStore.getImages.length - 1
        "
        @click="slide(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
        </svg>
      </button>
    </div>
    <div class="dots">
      <div v-if="imageStore.getImages.length < 10">
        <button
          v-for="(image, index) in imageStore.getImages"
          :key="image.id"
          class="dot"
          :aria-label="`Select Image ${index + 1}`"
          :class="{ active: imageStore.getCurrentIndex === index }"
          @click="selectSlide(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImageStore } from '~~/store/image'
const imageStore = useImageStore()
const props = defineProps<{
  images: {
    type: Image[]
    required: true
  }
}>()
onMounted(() => {
  imageStore.setImages(props.images)
})
const getImageUrl = () => {
  return (
    imageStore.getCurrentSlide.attributes.formats.large?.url ||
    imageStore.getCurrentSlide.attributes.url
  )
}
const selectSlide = (index: number) => {
  imageStore.setCurrentSlide(index)
}
const slide = (n: number) => {
  imageStore.slide(n)
}

const slider = setInterval(() => {
  if (imageStore.getCurrentIndex + 1 !== imageStore.getImages.length) {
    imageStore.slide(1)
  } else {
    imageStore.setCurrentSlide(0)
  }
}, 3000)

onBeforeUnmount(() => {
  imageStore.setCurrentSlide(0)
  imageStore.setImages([])
  clearInterval(slider)
})
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide {
  height: fit-content;
  position: relative;
}

.slide > *:not(img) {
  position: absolute;
}

.active-slide {
  display: block;
}

.prev,
.next {
  cursor: pointer;
  top: 50%;
  display: block;
  height: 48px;
  width: 48px;
  border-radius: 100%;
  border: none;
  background: rgba($color: #ffffff, $alpha: 0.6);
  transition: 0.6s ease;
  svg {
    height: 36px;
    path {
      fill: var(--color-accent-900);
    }
  }
}

.prev {
  left: 0.5rem;
}

.next {
  right: 0.5rem;
}

.prev:hover,
.next:hover {
  background-color: var(--color-white);
  svg {
    path {
      fill: var(--color-accent-500);
    }
  }
}

.dots {
  display: flex;
  justify-content: center;
  margin: var(--space-medium) 0 0 0;
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: var(--color-accent-200);
  border-radius: 50%;
  border-style: none;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: var(--color-accent-900);
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
