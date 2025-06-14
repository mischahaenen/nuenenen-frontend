import { onUnmounted, ref } from 'vue'

interface AutoplayProps {
  autoplay?: number
  images: Image[] | null
  respectMotionPreference?: boolean
}

export function useAutoplay(props: AutoplayProps, goToNext: () => void) {
  const isAutoplayActive = ref(false)
  const autoplayWasPaused = ref(false)
  let autoplayInterval: NodeJS.Timeout | null = null

  const prefersReducedMotion = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  }

  const startAutoplay = () => {
    if (props.autoplay && props.images && props.images.length > 1) {
      // Respect reduced motion preference
      if (props.respectMotionPreference !== false && prefersReducedMotion()) {
        isAutoplayActive.value = false
        return
      }

      isAutoplayActive.value = true
      autoplayInterval = setInterval(() => {
        goToNext()
      }, props.autoplay)
    }
  }

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval)
      autoplayInterval = null
    }
    isAutoplayActive.value = false
  }

  const toggleAutoplay = () => {
    if (isAutoplayActive.value) {
      stopAutoplay()
    } else {
      startAutoplay()
    }
  }

  const pauseAutoplay = () => {
    if (isAutoplayActive.value) {
      stopAutoplay()
      autoplayWasPaused.value = true
    }
  }

  const resumeAutoplay = () => {
    if (autoplayWasPaused.value) {
      startAutoplay()
      autoplayWasPaused.value = false
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stopAutoplay()
  })

  return {
    isAutoplayActive,
    startAutoplay,
    stopAutoplay,
    toggleAutoplay,
    pauseAutoplay,
    resumeAutoplay,
  }
}
