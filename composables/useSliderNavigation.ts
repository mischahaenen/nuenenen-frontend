import { nextTick, ref } from 'vue'

export function useSliderNavigation(getImages: () => Image[] | null) {
  const currentIndex = ref(0)

  const goToNext = () => {
    const images = getImages()
    if (!images?.length) return

    currentIndex.value =
      currentIndex.value < images.length - 1 ? currentIndex.value + 1 : 0

    announceSlideChange()
  }

  const goToPrevious = () => {
    const images = getImages()
    if (!images?.length) return

    currentIndex.value =
      currentIndex.value > 0 ? currentIndex.value - 1 : images.length - 1

    announceSlideChange()
  }

  const goToSlide = (index: number) => {
    const images = getImages()
    if (index >= 0 && index < (images?.length || 0)) {
      currentIndex.value = index
      announceSlideChange()
    }
  }

  const announceSlideChange = () => {
    nextTick(() => {
      const images = getImages()
      const announcement = `Jetzt wird Bild ${currentIndex.value + 1} von ${
        images?.length || 0
      } angezeigt`

      if (typeof window !== 'undefined') {
        const announcer = document.createElement('div')
        announcer.setAttribute('aria-live', 'assertive')
        announcer.setAttribute('aria-atomic', 'true')
        announcer.className = 'sr-only'
        announcer.textContent = announcement
        document.body.appendChild(announcer)

        setTimeout(() => {
          if (document.body.contains(announcer)) {
            document.body.removeChild(announcer)
          }
        }, 1000)
      }
    })
  }

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
  }
}
