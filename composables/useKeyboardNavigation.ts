import { onUnmounted, type ComputedRef, type Ref } from 'vue'

interface KeyboardNavigationOptions {
  goToNext: () => void
  goToPrevious: () => void
  goToSlide: (index: number) => void
  openFullscreen: () => void
  closeFullscreen: () => void
  stopAutoplay: () => void
  isFullscreen: Ref<boolean>
  imagesLength: ComputedRef<number>
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
  const setupKeyboardNavigation = () => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!options.imagesLength.value || options.imagesLength.value <= 1) return

      if (options.isFullscreen.value) {
        handleFullscreenKeys(event)
        return
      }

      // Only handle if the slider or its children have focus
      const sliderElement = document.querySelector('.image-slider')
      if (!sliderElement?.contains(document.activeElement)) return

      handleSliderKeys(event)
    }

    const handleFullscreenKeys = (event: KeyboardEvent) => {
      const keyActions: Record<string, () => void> = {
        ArrowLeft: () => {
          event.preventDefault()
          options.goToPrevious()
        },
        ArrowUp: () => {
          event.preventDefault()
          options.goToPrevious()
        },
        ArrowRight: () => {
          event.preventDefault()
          options.goToNext()
        },
        ArrowDown: () => {
          event.preventDefault()
          options.goToNext()
        },
        Home: () => {
          event.preventDefault()
          options.goToSlide(0)
        },
        End: () => {
          event.preventDefault()
          options.goToSlide(options.imagesLength.value - 1)
        },
        Escape: () => {
          event.preventDefault()
          options.closeFullscreen()
        },
      }

      const action = keyActions[event.key]
      if (action) {
        action()
      }
    }

    const handleSliderKeys = (event: KeyboardEvent) => {
      const keyActions: Record<string, () => void> = {
        ArrowLeft: () => {
          event.preventDefault()
          options.goToPrevious()
        },
        ArrowUp: () => {
          event.preventDefault()
          options.goToPrevious()
        },
        ArrowRight: () => {
          event.preventDefault()
          options.goToNext()
        },
        ArrowDown: () => {
          event.preventDefault()
          options.goToNext()
        },
        Home: () => {
          event.preventDefault()
          options.goToSlide(0)
        },
        End: () => {
          event.preventDefault()
          options.goToSlide(options.imagesLength.value - 1)
        },
        Escape: () => {
          event.preventDefault()
          options.stopAutoplay()
        },
      }

      const action = keyActions[event.key]
      if (action) {
        action()
      } else if (event.key === 'Enter' || event.key === ' ') {
        handleEnterSpace(event)
      }
    }

    const handleEnterSpace = (event: KeyboardEvent) => {
      const activeEl = document.activeElement

      if (activeEl?.classList.contains('pagination-dot')) {
        event.preventDefault()
        const dotIndex = Array.from(
          document.querySelectorAll('.pagination-dot')
        ).indexOf(activeEl)
        if (dotIndex !== -1) {
          options.goToSlide(dotIndex)
        }
      } else if (activeEl?.classList.contains('slide-image')) {
        event.preventDefault()
        options.openFullscreen()
      }
    }

    // Add global keyboard event listener
    document.addEventListener('keydown', handleKeydown)

    // Listen for reduced motion preference changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const handleMotionChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          options.stopAutoplay()
        }
      }
      mediaQuery.addEventListener('change', handleMotionChange)

      // Cleanup function for motion preference listener
      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handleMotionChange)
      })
    }

    // Cleanup function for keyboard listener
    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
    })
  }

  return {
    setupKeyboardNavigation,
  }
}
