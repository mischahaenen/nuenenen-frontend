<template>
  <section
    v-if="hasMultipleImages"
    class="image-slider"
    role="region"
    aria-label="Bildergalerie"
    @mouseenter="pauseAutoplay"
    @mouseleave="resumeAutoplay"
    @focusin="pauseAutoplay"
    @focusout="resumeAutoplay"
  >
    <div class="slider-container">
      <div
        class="slides-wrapper"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <SliderSlideItem
          v-for="(image, index) in props.images"
          :key="image.name"
          :image="image"
          :index="index"
          :is-active="index === currentIndex"
          @open-fullscreen="openFullscreen"
        />
      </div>

      <SliderPlayPauseButton
        v-if="props.autoplay"
        :is-active="isAutoplayActive"
        @toggle="toggleAutoplay"
      />

      <SliderNavigationButton
        direction="prev"
        :aria-label="getNavAriaLabel('prev')"
        @click="goToPrevious"
      />

      <SliderNavigationButton
        direction="next"
        :aria-label="getNavAriaLabel('next')"
        @click="goToNext"
      />
    </div>

    <SliderPaginationNav
      :images="props.images"
      :current-index="currentIndex"
      @go-to-slide="goToSlide"
    />

    <SliderScreenReaderStatus
      :current-index="currentIndex"
      :total="props.images?.length || 0"
      :is-autoplay-active="isAutoplayActive"
      :current-image="currentImage"
    />
  </section>

  <SliderFullscreenModal
    v-if="isFullscreen"
    :images="props.images"
    :current-index="currentIndex"
    @close="closeFullscreen"
    @navigate="handleNavigation"
    @go-to-slide="goToSlide"
  />

  <SliderSingleImage
    v-else-if="hasSingleImage"
    :image="props.images[0]"
    @open-fullscreen="openFullscreen"
  />
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  images: Image[] | null;
  autoplay?: number;
  wrapAround?: boolean;
  respectMotionPreference?: boolean;
}>();

// Composables
const { currentIndex, goToNext, goToPrevious, goToSlide } = useSliderNavigation(
  () => props.images
);

const {
  isAutoplayActive,
  startAutoplay,
  stopAutoplay,
  toggleAutoplay,
  pauseAutoplay,
  resumeAutoplay,
} = useAutoplay(props, goToNext);

const { isFullscreen, openFullscreen, closeFullscreen } = useFullscreen(
  isAutoplayActive,
  startAutoplay,
  stopAutoplay
);

const { setupKeyboardNavigation } = useKeyboardNavigation({
  goToNext,
  goToPrevious,
  goToSlide,
  openFullscreen,
  closeFullscreen,
  stopAutoplay,
  isFullscreen,
  imagesLength: computed(() => props.images?.length || 0),
});

// Computed
const hasMultipleImages = computed(() => props.images && props.images.length > 1);
const hasSingleImage = computed(() => props.images && props.images.length === 1);
const currentImage = computed(() => props.images?.[currentIndex.value]);

// Methods
const getNavAriaLabel = (direction: "prev" | "next") => {
  const action = direction === "prev" ? "Vorheriges" : "Nächstes";
  return `${action} Bild. Aktuell wird Bild ${currentIndex.value + 1} von ${
    props.images?.length
  } angezeigt`;
};

const handleNavigation = (direction: "prev" | "next") => {
  direction === "prev" ? goToPrevious() : goToNext();
};

// Lifecycle
onMounted(() => {
  setupKeyboardNavigation();
});
</script>

<style lang="scss">
@use '../assets/css/utils';

.image-slider {
  position: relative;
  width: 100%;
  height: 75vh;
  overflow: hidden;

  &:hover,
  &:focus-within {
    .nav-button {
      opacity: 1;
    }
  }
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slides-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.slide {
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  overflow: hidden;
  border-radius: var(--border-radius);
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.slide-image {
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  z-index: 2;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }

  &:focus {
    opacity: 1;
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &--play-pause {
    top: var(--space-small);
    right: var(--space-small);
    opacity: 0.8;
    transform: none;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    &:focus {
      opacity: 1;
      transform: none;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &--prev {
    left: var(--space-small);
  }

  &--next {
    right: var(--space-small);
  }
}

.pagination {
  position: absolute;
  bottom: var(--space-small);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  padding: var(--space-small);
  border-radius: var(--border-radius);
  z-index: 2;
}

.pagination-dot {
  width: 2rem;
  height: 0.75rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline-offset: 2px;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.single-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75vh;
  margin: 0;
  border-radius: var(--border-radius);
}

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

// Light mode styles (default)
.light-mode {
  .nav-button {
    background-color: var(--color-white);
    color: var(--color-primary-900);

    &:hover {
      background-color: var(--color-primary-50);
      color: var(--color-primary-800);
    }

    &:focus {
      outline-color: var(--color-primary-500);
    }
  }

  .pagination {
    background-color: var(--color-white);
  }

  .pagination-dot {
    background-color: var(--color-primary-50);

    &:hover {
      background-color: var(--color-primary-100);
    }

    &:focus {
      outline-color: var(--color-primary-500);
    }

    &.active {
      background-color: var(--color-primary-900);
    }
  }
}

// Dark mode styles
.dark-mode {
  .nav-button {
    background-color: var(--color-accent-900);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-accent-700);
    }

    &:focus {
      outline-color: var(--color-accent-50);
    }
  }

  .pagination {
    background-color: var(--color-primary-800);
  }

  .pagination-dot {
    background-color: var(--color-accent-100);

    &:hover {
      background-color: var(--color-accent-500);
    }

    &:focus {
      outline-color: var(--color-accent-50);
    }

    &.active {
      background-color: var(--color-accent-700);
    }
  }
}

// Responsive breakpoints
@include utils.breakpoint-md {
  .nav-button {
    opacity: 1; // Always show on mobile/tablet
    width: 2.5rem;
    height: 2.5rem;

    &--prev {
      left: 0.5rem;
    }

    &--next {
      right: 0.5rem;
    }
  }

  .pagination {
    bottom: 0.75rem;
    padding: 0.75rem;
  }

  .pagination-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
  }
}

@include utils.breakpoint-sm {
  .image-slider,
  .single-image {
    height: 50vh;
  }

  .nav-button {
    width: 2rem;
    height: 2rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .pagination {
    padding: 0.5rem;
    gap: 0.25rem;
  }

  .pagination-dot {
    width: 0.5rem;
    height: 0.5rem;
  }
}

// Focus indicators for better keyboard navigation
@media (prefers-reduced-motion: no-preference) {
  .nav-button,
  .pagination-dot {
    &:hover,
    &:focus {
      transition: all 0.2s ease-in-out;
    }
  }
}

// High contrast mode support
@media (prefers-contrast: high) {
  .nav-button {
    border: 2px solid currentColor;
  }

  .pagination-dot {
    border: 1px solid currentColor;

    &.active {
      border-width: 2px;
    }
  }
}
</style>
