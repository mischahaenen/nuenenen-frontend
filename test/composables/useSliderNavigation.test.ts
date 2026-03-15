import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSliderNavigation } from '~/composables/useSliderNavigation'

const mockImages: Image[] = [
  {
    id: 1,
    name: 'img1.jpg',
    hash: 'hash1',
    ext: '.jpg',
    alternativeText: 'Image 1',
  },
  {
    id: 2,
    name: 'img2.jpg',
    hash: 'hash2',
    ext: '.jpg',
    alternativeText: 'Image 2',
  },
  {
    id: 3,
    name: 'img3.jpg',
    hash: 'hash3',
    ext: '.jpg',
    alternativeText: 'Image 3',
  },
] as any

describe('useSliderNavigation', () => {
  let getImages: ReturnType<typeof vi.fn>

  beforeEach(() => {
    getImages = vi.fn(() => mockImages)
  })

  it('initializes currentIndex to 0', () => {
    const { currentIndex } = useSliderNavigation(getImages)
    expect(currentIndex.value).toBe(0)
  })

  describe('goToNext', () => {
    it('increments the index', () => {
      const { currentIndex, goToNext } = useSliderNavigation(getImages)
      goToNext()
      expect(currentIndex.value).toBe(1)
    })

    it('wraps around to 0 from the last image', () => {
      const { currentIndex, goToNext } = useSliderNavigation(getImages)
      currentIndex.value = 2
      goToNext()
      expect(currentIndex.value).toBe(0)
    })

    it('does nothing when no images', () => {
      getImages = vi.fn(() => null)
      const { currentIndex, goToNext } = useSliderNavigation(getImages)
      goToNext()
      expect(currentIndex.value).toBe(0)
    })
  })

  describe('goToPrevious', () => {
    it('decrements the index', () => {
      const { currentIndex, goToPrevious } = useSliderNavigation(getImages)
      currentIndex.value = 2
      goToPrevious()
      expect(currentIndex.value).toBe(1)
    })

    it('wraps around to last image from index 0', () => {
      const { currentIndex, goToPrevious } = useSliderNavigation(getImages)
      goToPrevious()
      expect(currentIndex.value).toBe(2)
    })

    it('does nothing when no images', () => {
      getImages = vi.fn(() => [])
      const { currentIndex, goToPrevious } = useSliderNavigation(getImages)
      goToPrevious()
      expect(currentIndex.value).toBe(0)
    })
  })

  describe('goToSlide', () => {
    it('navigates to the specified index', () => {
      const { currentIndex, goToSlide } = useSliderNavigation(getImages)
      goToSlide(2)
      expect(currentIndex.value).toBe(2)
    })

    it('ignores out-of-bounds index (negative)', () => {
      const { currentIndex, goToSlide } = useSliderNavigation(getImages)
      goToSlide(-1)
      expect(currentIndex.value).toBe(0)
    })

    it('ignores out-of-bounds index (too large)', () => {
      const { currentIndex, goToSlide } = useSliderNavigation(getImages)
      goToSlide(99)
      expect(currentIndex.value).toBe(0)
    })
  })
})
