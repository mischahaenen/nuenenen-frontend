import { nextTick, onUnmounted, ref, type Ref } from 'vue'

export function useFullscreen(
  isAutoplayActive: Ref<boolean>,
  startAutoplay: () => void,
  stopAutoplay: () => void
) {
  const isFullscreen = ref(false)
  const autoplayWasPaused = ref(false)
  let previouslyFocusedElement: Element | null = null

  const openFullscreen = () => {
    // Store the currently focused element
    previouslyFocusedElement = document.activeElement

    isFullscreen.value = true

    // Stop autoplay when entering fullscreen
    if (isAutoplayActive.value) {
      stopAutoplay()
      autoplayWasPaused.value = true
    }

    // Prevent body scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }

    // Set up focus trap after DOM updates
    nextTick(() => {
      // Focus the close button initially
      const closeButton = document.querySelector(
        '.fullscreen-close'
      ) as HTMLElement
      if (closeButton) {
        closeButton.focus()
      }
    })
  }

  const closeFullscreen = () => {
    isFullscreen.value = false

    // Restore body scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }

    // Resume autoplay if it was active before
    if (autoplayWasPaused.value) {
      startAutoplay()
      autoplayWasPaused.value = false
    }

    // Return focus to the previously focused element
    nextTick(() => {
      if (previouslyFocusedElement && 'focus' in previouslyFocusedElement) {
        ;(previouslyFocusedElement as HTMLElement).focus()
      } else {
        // Fallback: focus the current slide image
        const currentSlideImage = document.querySelector(
          '.slide.active .slide-image'
        ) as HTMLElement
        if (currentSlideImage) {
          currentSlideImage.focus()
        }
      }
      previouslyFocusedElement = null
    })
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (isFullscreen.value && typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }

    // Restore focus if needed
    if (previouslyFocusedElement && 'focus' in previouslyFocusedElement) {
      ;(previouslyFocusedElement as HTMLElement).focus()
    }
  })

  return {
    isFullscreen,
    openFullscreen,
    closeFullscreen,
  }
}
