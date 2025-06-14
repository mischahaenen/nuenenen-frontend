<template>
  <section
    v-if="props.images && props.images.length > 1"
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
        <figure
          v-for="(image, index) in props.images"
          :key="image.name"
          class="slide"
          :class="{ active: index === currentIndex }"
          :aria-hidden="index !== currentIndex"
        >
          <div class="image-container">
            <NuxtImg
              format="webp"
              provider="strapi"
              class="slide-image"
              :src="image.hash + image.ext"
              :alt="image.alternativeText || image.name"
              sizes="100vw sm:50vw md:400px"
              :tabindex="index === currentIndex ? 0 : -1"
              @click="openFullscreen"
              @keydown.enter="openFullscreen"
              @keydown.space="openFullscreen"
              role="button"
              :aria-label="`${
                image.alternativeText || image.name
              } - Klicken für Vollbildmodus`"
              style="cursor: pointer"
            />
          </div>
        </figure>
      </div>

      <!-- Play/Pause button for autoplay -->
      <button
        v-if="props.autoplay && props.images && props.images.length > 1"
        class="nav-button nav-button--play-pause"
        @click="toggleAutoplay"
        :aria-label="isAutoplayActive ? 'Diashow pausieren' : 'Diashow starten'"
        :aria-pressed="isAutoplayActive"
      >
        <svg
          v-if="isAutoplayActive"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <polygon points="5,3 19,12 5,21"></polygon>
        </svg>
      </button>

      <!-- Navigation buttons - Always enabled, wrap around -->
      <button
        class="nav-button nav-button--prev"
        @click="goToPrevious"
        :aria-label="`Vorheriges Bild. Aktuell wird Bild ${currentIndex + 1} von ${
          props.images.length
        } angezeigt`"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <button
        class="nav-button nav-button--next"
        @click="goToNext"
        :aria-label="`Nächstes Bild. Aktuell wird Bild ${currentIndex + 1} von ${
          props.images.length
        } angezeigt`"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>

    <!-- Pagination dots -->
    <nav class="pagination" role="tablist" aria-label="Bilder-Navigation">
      <button
        v-for="(image, index) in props.images"
        :key="`dot-${index}`"
        class="pagination-dot"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`Zu Bild ${index + 1} von ${props.images.length} wechseln`"
        :aria-selected="index === currentIndex"
        :aria-current="index === currentIndex ? 'true' : 'false'"
        role="tab"
        :tabindex="index === currentIndex ? 0 : -1"
      ></button>
    </nav>

    <!-- Enhanced screen reader status -->
    <div
      class="sr-only"
      aria-live="polite"
      aria-atomic="true"
      :aria-label="`Status der Bildergalerie`"
    >
      Bild {{ currentIndex + 1 }} von {{ props.images.length }} wird angezeigt.
      {{
        isAutoplayActive
          ? "Die Diashow läuft automatisch ab."
          : "Die Diashow ist pausiert."
      }}
      {{
        props.images[currentIndex]?.alternativeText || props.images[currentIndex]?.name
      }}
    </div>

    <!-- Additional screen reader instructions -->
    <div class="sr-only">
      Verwenden Sie die Pfeiltasten, um zwischen den Bildern zu navigieren, Pos1 für das
      erste Bild, Ende für das letzte Bild. Klicken Sie auf ein Bild oder drücken Sie
      Enter, um den Vollbildmodus zu öffnen.
    </div>
  </section>

  <!-- Fullscreen Modal -->
  <div
    v-if="isFullscreen"
    class="fullscreen-modal"
    role="dialog"
    aria-modal="true"
    aria-label="Vollbild-Bildergalerie"
    @click="handleBackdropClick"
    @keydown.escape="closeFullscreen"
  >
    <div class="fullscreen-container" @click.stop>
      <!-- Close button - first focusable element -->
      <button
        class="fullscreen-close"
        @click="closeFullscreen"
        aria-label="Vollbildmodus schließen"
        tabindex="0"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Fullscreen image -->
      <div class="fullscreen-image-container" @click.stop>
        <NuxtImg
          v-if="props.images && props.images[currentIndex]"
          format="webp"
          provider="strapi"
          class="fullscreen-image"
          :src="props.images[currentIndex].hash + props.images[currentIndex].ext"
          :alt="
            props.images[currentIndex].alternativeText || props.images[currentIndex].name
          "
          sizes="100vw"
        />
      </div>

      <!-- Fullscreen navigation -->
      <div v-if="props.images && props.images.length > 1" class="fullscreen-nav">
        <button
          class="fullscreen-nav-button fullscreen-nav-button--prev"
          @click.stop="goToPrevious"
          :aria-label="`Vorheriges Bild. Aktuell wird Bild ${currentIndex + 1} von ${
            props.images.length
          } angezeigt`"
          tabindex="0"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        <button
          class="fullscreen-nav-button fullscreen-nav-button--next"
          @click.stop="goToNext"
          :aria-label="`Nächstes Bild. Aktuell wird Bild ${currentIndex + 1} von ${
            props.images.length
          } angezeigt`"
          tabindex="0"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>

      <!-- Fullscreen pagination -->
      <nav
        v-if="props.images && props.images.length > 1"
        class="fullscreen-pagination"
        role="tablist"
        aria-label="Bilder-Navigation im Vollbildmodus"
        @click.stop
      >
        <button
          v-for="(image, index) in props.images"
          :key="`fullscreen-dot-${index}`"
          class="fullscreen-pagination-dot"
          :class="{ active: index === currentIndex }"
          @click.stop="goToSlide(index)"
          :aria-label="`Zu Bild ${index + 1} von ${props.images.length} wechseln`"
          :aria-selected="index === currentIndex"
          :aria-current="index === currentIndex ? 'true' : 'false'"
          role="tab"
          :tabindex="index === currentIndex ? 0 : -1"
        ></button>
      </nav>

      <!-- Fullscreen image info -->
      <div class="fullscreen-info" @click.stop>
        <span class="fullscreen-counter">
          {{ currentIndex + 1 }} / {{ props.images?.length || 0 }}
        </span>
        <span
          v-if="props.images && props.images[currentIndex]?.alternativeText"
          class="fullscreen-description"
        >
          {{ props.images[currentIndex].alternativeText }}
        </span>
      </div>
    </div>

    <!-- Enhanced screen reader announcement for fullscreen -->
    <div class="sr-only" aria-live="assertive" aria-atomic="true">
      Vollbildmodus geöffnet. Bild {{ currentIndex + 1 }} von
      {{ props.images?.length || 0 }} wird angezeigt. Verwenden Sie Tab zum Navigieren
      zwischen Bedienelementen, Pfeiltasten zum Wechseln zwischen Bildern, oder Escape zum
      Schließen.
    </div>
  </div>

  <!-- Single image fallback -->
  <figure
    v-else-if="props.images && props.images.length === 1"
    class="single-image"
    role="img"
    :aria-label="props.images[0].alternativeText || props.images[0].name"
  >
    <div class="image-container">
      <NuxtImg
        class="slide-image"
        format="webp"
        provider="strapi"
        :src="props.images[0].hash + props.images[0].ext"
        :alt="props.images[0].alternativeText || props.images[0].name"
        sizes="100vw sm:50vw md:400px"
        @click="openFullscreen"
        @keydown.enter="openFullscreen"
        @keydown.space="openFullscreen"
        role="button"
        :aria-label="`${
          props.images[0].alternativeText || props.images[0].name
        } - Klicken für Vollbildmodus`"
        style="cursor: pointer"
        tabindex="0"
      />
    </div>
  </figure>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  images: Image[] | null;
  autoplay?: number;
  wrapAround?: boolean;
  respectMotionPreference?: boolean;
}>();

const currentIndex = ref(0);
const isAutoplayActive = ref(false);
const autoplayWasPaused = ref(false);
const isFullscreen = ref(false);
let autoplayInterval: NodeJS.Timeout | null = null;
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;
let previouslyFocusedElement = null;

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return false;
};

// Enhanced navigation - always wraps around for better UX
const goToNext = () => {
  if (!props.images || props.images.length === 0) return;

  // Always wrap around - when at the end, go to beginning
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Wrap to beginning
  }

  // Announce the change to screen readers
  announceSlideChange();
};

const goToPrevious = () => {
  if (!props.images || props.images.length === 0) return;

  // Always wrap around - when at the beginning, go to end
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = props.images.length - 1; // Wrap to end
  }

  // Announce the change to screen readers
  announceSlideChange();
};

const goToSlide = (index: number) => {
  if (index >= 0 && index < (props.images?.length || 0)) {
    currentIndex.value = index;
    announceSlideChange();
  }
};

// Fullscreen functionality
const openFullscreen = () => {
  // Store the currently focused element
  previouslyFocusedElement = document.activeElement;

  isFullscreen.value = true;

  // Stop autoplay when entering fullscreen
  if (isAutoplayActive.value) {
    stopAutoplay();
    autoplayWasPaused.value = true;
  }

  // Prevent body scroll
  if (typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
  }

  // Set up focus trap after DOM updates
  nextTick(() => {
    setupFocusTrap();
    // Focus the close button initially
    const closeButton = document.querySelector(".fullscreen-close");
    if (closeButton) {
      closeButton.focus();
    }
  });
};

const closeFullscreen = () => {
  isFullscreen.value = false;

  // Restore body scroll
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }

  // Resume autoplay if it was active before
  if (autoplayWasPaused.value) {
    startAutoplay();
    autoplayWasPaused.value = false;
  }

  // Return focus to the previously focused element
  nextTick(() => {
    if (
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function"
    ) {
      previouslyFocusedElement.focus();
    } else {
      // Fallback: focus the current slide image
      const currentSlideImage = document.querySelector(".slide.active .slide-image");
      if (currentSlideImage) {
        currentSlideImage.focus();
      }
    }
    previouslyFocusedElement = null;
  });
};

const setupFocusTrap = () => {
  const modal = document.querySelector(".fullscreen-modal");
  if (!modal) return;

  // Get all focusable elements within the modal
  const focusableSelectors = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  focusableElements = Array.from(modal.querySelectorAll(focusableSelectors));
  firstFocusableElement = focusableElements[0];
  lastFocusableElement = focusableElements[focusableElements.length - 1];
};

const handleFocusTrap = (event) => {
  if (!isFullscreen.value) return;

  // Handle Tab key
  if (event.key === "Tab") {
    // If no focusable elements, prevent default
    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    // Shift + Tab (backwards)
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement?.focus();
      }
    }
    // Tab (forwards)
    else {
      if (document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement?.focus();
      }
    }
  }
};

// Announce slide changes for better screen reader experience
const announceSlideChange = () => {
  // Small delay to ensure the DOM has updated
  nextTick(() => {
    const announcement = `Jetzt wird Bild ${currentIndex.value + 1} von ${
      props.images?.length || 0
    } angezeigt`;
    // Create a temporary element for announcement
    if (typeof window !== "undefined") {
      const announcer = document.createElement("div");
      announcer.setAttribute("aria-live", "assertive");
      announcer.setAttribute("aria-atomic", "true");
      announcer.className = "sr-only";
      announcer.textContent = announcement;
      document.body.appendChild(announcer);

      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 1000);
    }
  });
};

const startAutoplay = () => {
  if (props.autoplay && props.images && props.images.length > 1) {
    // Respect reduced motion preference
    if (props.respectMotionPreference !== false && prefersReducedMotion()) {
      isAutoplayActive.value = false;
      return;
    }

    isAutoplayActive.value = true;
    autoplayInterval = setInterval(() => {
      goToNext();
    }, props.autoplay);
  }
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
  isAutoplayActive.value = false;
};

const toggleAutoplay = () => {
  if (isAutoplayActive.value) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
};

// Enhanced keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  // Handle focus trap first
  handleFocusTrap(event);

  if (!props.images || props.images.length <= 1) return;

  // Handle fullscreen keyboard navigation
  if (isFullscreen.value) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        goToPrevious();
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        goToNext();
        break;
      case "Home":
        event.preventDefault();
        goToSlide(0);
        break;
      case "End":
        event.preventDefault();
        goToSlide(props.images.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        closeFullscreen();
        break;
    }
    return;
  }

  // Only handle if the slider or its children have focus
  const sliderElement = event.currentTarget;
  if (!sliderElement?.contains(document.activeElement)) return;

  switch (event.key) {
    case "ArrowLeft":
    case "ArrowUp":
      event.preventDefault();
      goToPrevious();
      break;
    case "ArrowRight":
    case "ArrowDown":
      event.preventDefault();
      goToNext();
      break;
    case "Home":
      event.preventDefault();
      goToSlide(0);
      break;
    case "End":
      event.preventDefault();
      goToSlide(props.images.length - 1);
      break;
    case "Enter":
    case " ":
      // If focus is on pagination dot, activate it
      if (document.activeElement?.classList.contains("pagination-dot")) {
        event.preventDefault();
        const dotIndex = Array.from(document.querySelectorAll(".pagination-dot")).indexOf(
          document.activeElement
        );
        if (dotIndex !== -1) {
          goToSlide(dotIndex);
        }
      }
      // If focus is on slide image, open fullscreen
      else if (document.activeElement?.classList.contains("slide-image")) {
        event.preventDefault();
        openFullscreen();
      }
      break;
    case "Escape":
      // Stop autoplay on escape
      if (isAutoplayActive.value) {
        event.preventDefault();
        stopAutoplay();
      }
      break;
  }
};

onMounted(() => {
  // Add keyboard event listener to the document for global navigation
  document.addEventListener("keydown", handleKeydown);

  // Listen for reduced motion preference changes
  if (typeof window !== "undefined" && window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", (e) => {
      if (e.matches && isAutoplayActive.value) {
        stopAutoplay();
      }
    });
  }
});

onUnmounted(() => {
  stopAutoplay();
  document.removeEventListener("keydown", handleKeydown);

  // Clean up fullscreen state
  if (isFullscreen.value && typeof document !== "undefined") {
    document.body.style.overflow = "";
  }

  // Restore focus if needed
  if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === "function") {
    previouslyFocusedElement.focus();
  }
});

// Pause autoplay on hover/focus for better accessibility
const pauseAutoplay = () => {
  if (isAutoplayActive.value) {
    stopAutoplay();
    autoplayWasPaused.value = true;
  }
};

const resumeAutoplay = () => {
  if (autoplayWasPaused.value) {
    startAutoplay();
    autoplayWasPaused.value = false;
  }
};

// Watch for changes in current index to update pagination focus
watch(currentIndex, (newIndex) => {
  // Update pagination dot focus for keyboard users
  nextTick(() => {
    const activeDot = document.querySelector(".pagination-dot.active") as HTMLElement;
    if (activeDot && document.activeElement?.classList.contains("pagination-dot")) {
      activeDot.focus();
    }
  });
});
</script>

<style lang="scss" scoped>
@use '../assets/css/utils';

.image-slider {
  position: relative;
  width: 100%;
  height: 75vh;
  background: var(--color-accent-900);
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
  background: var(--color-accent-900);
  overflow: hidden;
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
  height: 100%;
  object-fit: cover;
  object-position: center;
  background: var(--color-accent-900);
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
  background-color: var(--color-white);
  color: var(--color-primary-900);

  &:hover {
    background-color: var(--color-primary-50);
    color: var(--color-primary-800);
    transform: translateY(-50%) scale(1.1);
  }

  &:focus {
    opacity: 1;
    outline: 3px solid var(--color-primary-500);
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
  background-color: var(--color-white);
  padding: var(--space-small);
  border-radius: var(--border-radius);
  z-index: 2;
}

.pagination-dot {
  width: 2rem;
  height: 0.75rem;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--color-primary-50);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-primary-100);
    transform: scale(1.1);
  }

  &:focus {
    outline: 3px solid var(--color-primary-500);
    outline-offset: 2px;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &.active {
    background-color: var(--color-primary-900);
  }
}

.single-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75vh;
  background: var(--color-accent-900);
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
  .slide,
  .slide-image,
  .single-image {
    background: var(--color-accent-900);
  }

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
  .slide,
  .slide-image,
  .single-image {
    background: var(--color-primary-900);
  }

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

// Responsive breakpoints using your mixins
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

// Fullscreen modal styles
.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.fullscreen-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(4px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &:focus {
    outline: 3px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }
}

.fullscreen-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
}

.fullscreen-image {
  max-width: calc(100vw - 4rem); // Viewport width minus padding
  max-height: calc(100vh - 4rem); // Viewport height minus padding
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--border-radius);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

// Adjust for navigation elements on mobile
@include utils.breakpoint-md {
  .fullscreen-image {
    max-width: calc(100vw - 3rem);
    max-height: calc(100vh - 8rem);
  }
}

@include utils.breakpoint-sm {
  .fullscreen-image {
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 10rem);
  }
}

.fullscreen-nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(4px);
  z-index: 10000;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  &:focus {
    outline: 3px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &--prev {
    left: 2rem;
  }

  &--next {
    right: 2rem;
  }
}

.fullscreen-pagination {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: var(--border-radius);
  backdrop-filter: blur(4px);
  z-index: 10000;
}

.fullscreen-pagination-dot {
  width: 0.75rem;
  height: 0.75rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
    transform: scale(1.2);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }

  &.active {
    background-color: white;
  }
}

.fullscreen-info {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  z-index: 10000;
}

.fullscreen-counter {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.fullscreen-description {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  max-width: 20rem;
  text-align: right;
  backdrop-filter: blur(4px);
}

// Mobile fullscreen adjustments
@include utils.breakpoint-md {
  .fullscreen-close {
    top: 0.75rem;
    right: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .fullscreen-nav-button {
    width: 3rem;
    height: 3rem;

    &--prev {
      left: 1rem;
    }

    &--next {
      right: 1rem;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .fullscreen-pagination {
    bottom: 1.5rem;
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .fullscreen-pagination-dot {
    width: 0.625rem;
    height: 0.625rem;
  }

  .fullscreen-info {
    bottom: 1.5rem;
    right: 1rem;
  }
}

@include utils.breakpoint-sm {
  .fullscreen-image-container {
    max-width: 95vw;
    max-height: 85vh;
  }

  .fullscreen-close {
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .fullscreen-nav-button {
    width: 2.5rem;
    height: 2.5rem;

    &--prev {
      left: 0.5rem;
    }

    &--next {
      right: 0.5rem;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .fullscreen-pagination {
    bottom: 1rem;
    padding: 0.5rem;
    gap: 0.375rem;
  }

  .fullscreen-pagination-dot {
    width: 0.5rem;
    height: 0.5rem;
  }

  .fullscreen-info {
    bottom: 1rem;
    right: 0.5rem;
    max-width: calc(100vw - 1rem);
  }

  .fullscreen-counter,
  .fullscreen-description {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }

  .fullscreen-description {
    max-width: 15rem;
  }
}
</style>
