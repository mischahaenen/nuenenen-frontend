<template>
  <div
    class="fullscreen-modal"
    role="dialog"
    aria-modal="true"
    aria-label="Vollbild-Bildergalerie"
    @click="handleBackdropClick"
    @keydown.escape="$emit('close')"
  >
    <div class="fullscreen-container" @click.stop>
      <!-- Close button -->
      <button
        class="fullscreen-close"
        @click="$emit('close')"
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
          v-if="images && images[currentIndex]"
          format="webp"
          provider="strapi"
          class="fullscreen-image"
          :src="images[currentIndex].hash + images[currentIndex].ext"
          :alt="images[currentIndex].alternativeText || images[currentIndex].name"
          sizes="100vw"
        />
      </div>

      <!-- Fullscreen navigation -->
      <div v-if="images && images.length > 1" class="fullscreen-nav">
        <button
          class="fullscreen-nav-button fullscreen-nav-button--prev"
          @click.stop="$emit('navigate', 'prev')"
          :aria-label="getNavAriaLabel('prev')"
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
          @click.stop="$emit('navigate', 'next')"
          :aria-label="getNavAriaLabel('next')"
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
        v-if="images && images.length > 1"
        class="fullscreen-pagination"
        role="tablist"
        aria-label="Bilder-Navigation im Vollbildmodus"
        @click.stop
      >
        <button
          v-for="(image, index) in images"
          :key="`fullscreen-dot-${index}`"
          class="fullscreen-pagination-dot"
          :class="{ active: index === currentIndex }"
          @click.stop="$emit('go-to-slide', index)"
          :aria-label="`Zu Bild ${index + 1} von ${images.length} wechseln`"
          :aria-selected="index === currentIndex"
          :aria-current="index === currentIndex ? 'true' : 'false'"
          role="tab"
          :tabindex="index === currentIndex ? 0 : -1"
        />
      </nav>

      <!-- Fullscreen image info -->
      <div class="fullscreen-info" @click.stop>
        <span class="fullscreen-counter">
          {{ currentIndex + 1 }} / {{ images?.length || 0 }}
        </span>
        <span
          v-if="images && images[currentIndex]?.alternativeText"
          class="fullscreen-description"
        >
          {{ images[currentIndex].alternativeText }}
        </span>
      </div>
    </div>

    <!-- Screen reader announcement -->
    <div class="sr-only" aria-live="assertive" aria-atomic="true">
      Vollbildmodus geöffnet. Bild {{ currentIndex + 1 }} von
      {{ images?.length || 0 }}
      wird angezeigt. Verwenden Sie Tab zum Navigieren zwischen Bedienelementen,
      Pfeiltasten zum Wechseln zwischen Bildern, oder Escape zum Schließen.
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: Image[];
  currentIndex: number;
}>();

const emit = defineEmits<{
  close: [];
  navigate: [direction: "prev" | "next"];
  "go-to-slide": [index: number];
}>();

const getNavAriaLabel = (direction: "prev" | "next") => {
  const action = direction === "prev" ? "Vorheriges" : "Nächstes";
  return `${action} Bild. Aktuell wird Bild ${props.currentIndex + 1} von ${
    props.images.length
  } angezeigt`;
};

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit("close");
  }
};
</script>

<style lang="scss" scoped>
@use '../../assets/css/utils';

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
  top: var(--space-small);
  right: var(--space-small);
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
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
    outline: 3px solid var(--color-accent-50);
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
  padding: var(--space-medium);
  box-sizing: border-box;
}

.fullscreen-image {
  max-width: calc(100vw - var(--space-large));
  max-height: calc(100vh - var(--space-large));
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--border-radius);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.fullscreen-nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 50%;
  background-color: var(--color-primary-800);
  color: var(--color-white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(4px);
  z-index: 10000;
  opacity: 0.8;

  &:hover {
    background-color: var(--color-primary-700);
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }

  &:focus {
    outline: 3px solid var(--color-accent-50);
    outline-offset: 2px;
    opacity: 1;
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &--prev {
    left: var(--space-medium);
  }

  &--next {
    right: var(--space-medium);
  }
}

.fullscreen-pagination {
  position: absolute;
  bottom: var(--space-medium);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  background-color: var(--color-primary-800);
  padding: var(--space-small);
  border-radius: var(--border-radius);
  backdrop-filter: blur(4px);
  z-index: 10000;
  opacity: 0.9;
}

.fullscreen-pagination-dot {
  width: 0.75rem;
  height: 0.75rem;
  border: none;
  border-radius: 50%;
  background-color: var(--color-primary-200);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.6;

  &:hover {
    background-color: var(--color-primary-100);
    opacity: 1;
    transform: scale(1.2);
  }

  &:focus {
    outline: 2px solid var(--color-accent-50);
    outline-offset: 2px;
    opacity: 1;
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }

  &.active {
    background-color: var(--color-accent-400);
    opacity: 1;
  }
}

.fullscreen-info {
  position: absolute;
  bottom: var(--space-medium);
  right: var(--space-medium);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  z-index: 10000;
}

.fullscreen-counter {
  background-color: var(--color-primary-900);
  color: var(--color-white);
  padding: 0.5rem var(--space-small);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
  opacity: 0.9;
}

.fullscreen-description {
  background-color: var(--color-primary-900);
  color: var(--color-white);
  padding: 0.5rem var(--space-small);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  max-width: 20rem;
  text-align: right;
  backdrop-filter: blur(4px);
  opacity: 0.9;
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

// Mobile fullscreen adjustments
@include utils.breakpoint-md {
  .fullscreen-close {
    top: 0.75rem;
    right: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  .fullscreen-nav-button {
    width: 3rem;
    height: 3rem;

    &--prev {
      left: var(--space-small);
    }

    &--next {
      right: var(--space-small);
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
    right: var(--space-small);
  }

  .fullscreen-image {
    max-width: calc(100vw - 3rem);
    max-height: calc(100vh - 8rem);
  }
}

@include utils.breakpoint-sm {
  .fullscreen-close {
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
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
  }

  .fullscreen-pagination {
    bottom: var(--space-small);
    padding: 0.5rem;
    gap: 0.375rem;
  }

  .fullscreen-pagination-dot {
    width: 0.5rem;
    height: 0.5rem;
  }

  .fullscreen-info {
    bottom: var(--space-small);
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

  .fullscreen-image {
    max-width: calc(100vw - var(--space-medium));
    max-height: calc(100vh - 10rem);
  }
}
</style>
