<template>
  <div v-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else-if="error">
    <p>Error loading images</p>
  </div>
  <div v-else-if="images?.length" class="slider">
    <div class="slide">
      <img
        class="fade active-slide"
        :src="getImageUrl()"
        :alt="imageStore.getCurrentSlide.attributes.alternativeText || ''"
      />
      <button
        class="prev"
        aria-label="Previous Image"
        :disabled="imageStore.getCurrentIndex === 0"
        @click="slide(-1)"
      >
        <span class="sr-only">Previous Image</span>
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
        <span class="sr-only">Next Image</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
        </svg>
      </button>
    </div>
    <div v-if="images?.length < 10" class="dots">
      <button
        v-for="(image, index) in images"
        :key="image.id"
        class="dot"
        :aria-label="`Select Image ${index + 1}`"
        :class="{ active: imageStore.getCurrentIndex === index }"
        @click="selectSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImageStore } from '~~/store/image'
const imageStore = useImageStore()
const slider = useState<any>(() => null)
const props = defineProps<{
  images: Image[] | null
}>()

const {
  data: images,
  pending,
  error,
} = useAsyncData('images', async () => {
  await imageStore.setImages(props.images || [])
  return props.images
})

const getImageUrl = () => {
  return (
    imageStore.getCurrentSlide?.attributes?.formats?.large?.url ||
    imageStore.getCurrentSlide?.attributes.url
  )
}

const startInterval = () => {
  clearInterval(slider.value)
  slider.value = setInterval(() => {
    if (imageStore.getCurrentIndex + 1 !== imageStore.getImages.length) {
      imageStore.slide(1)
    } else {
      imageStore.setCurrentSlide(0)
    }
  }, 3000)
}

const selectSlide = (index: number) => {
  imageStore.setCurrentSlide(index)
  startInterval()
}

const slide = (n: number) => {
  imageStore.slide(n)
  startInterval()
}

startInterval()

onBeforeUnmount(() => {
  imageStore.setCurrentSlide(0)
  imageStore.setImages([])
  clearInterval(slider.value)
})
</script>

<style lang="scss" scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.slide {
  position: relative;
  max-width: 100%;
  img {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    object-position: center;
    border-radius: var(--border-radius);
  }
}

.slide > *:not(img) {
  position: absolute;
}

.prev,
.next {
  position: absolute;
  top: calc(50% - 24px);
  cursor: pointer;
  height: 48px;
  width: 48px;
  border: none;
  border-radius: 50%;
  background: rgba($color: #ffffff, $alpha: 0.6);
  transition: background-color 0.6s ease;
  svg {
    height: 36px;
    path {
      fill: var(--color-accent-900);
    }
  }
}

.prev:hover,
.next:hover {
  background: var(--color-white);
}

.prev {
  left: 5%;
}

.next {
  right: 5%;
}

@media screen and (max-width: 768px) {
  .prev,
  .next {
    height: 36px;
    width: 36px;
    svg {
      height: 24px;
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
