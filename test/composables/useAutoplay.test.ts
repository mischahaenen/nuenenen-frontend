import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAutoplay } from '~/composables/useAutoplay'

const mockImages: Image[] = [
  { id: 1, name: 'img1.jpg', hash: 'hash1', ext: '.jpg' },
  { id: 2, name: 'img2.jpg', hash: 'hash2', ext: '.jpg' },
] as any

describe('useAutoplay', () => {
  let goToNext: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.useFakeTimers()
    goToNext = vi.fn()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with autoplay inactive', () => {
    const { isAutoplayActive } = useAutoplay({ images: mockImages }, goToNext)
    expect(isAutoplayActive.value).toBe(false)
  })

  describe('startAutoplay', () => {
    it('sets isAutoplayActive to true', () => {
      const { isAutoplayActive, startAutoplay } = useAutoplay(
        { autoplay: 3000, images: mockImages },
        goToNext
      )
      startAutoplay()
      expect(isAutoplayActive.value).toBe(true)
    })

    it('calls goToNext on each interval', () => {
      const { startAutoplay } = useAutoplay(
        { autoplay: 1000, images: mockImages },
        goToNext
      )
      startAutoplay()
      vi.advanceTimersByTime(3000)
      expect(goToNext).toHaveBeenCalledTimes(3)
    })

    it('does not start if only one image', () => {
      const { isAutoplayActive, startAutoplay } = useAutoplay(
        { autoplay: 1000, images: [mockImages[0]] },
        goToNext
      )
      startAutoplay()
      expect(isAutoplayActive.value).toBe(false)
    })

    it('does not start without autoplay prop', () => {
      const { isAutoplayActive, startAutoplay } = useAutoplay(
        { images: mockImages },
        goToNext
      )
      startAutoplay()
      expect(isAutoplayActive.value).toBe(false)
    })
  })

  describe('stopAutoplay', () => {
    it('sets isAutoplayActive to false and stops calling goToNext', () => {
      const { isAutoplayActive, startAutoplay, stopAutoplay } = useAutoplay(
        { autoplay: 1000, images: mockImages },
        goToNext
      )
      startAutoplay()
      stopAutoplay()
      vi.advanceTimersByTime(5000)
      expect(isAutoplayActive.value).toBe(false)
      expect(goToNext).not.toHaveBeenCalled()
    })
  })

  describe('toggleAutoplay', () => {
    it('starts autoplay when inactive', () => {
      const { isAutoplayActive, toggleAutoplay } = useAutoplay(
        { autoplay: 1000, images: mockImages },
        goToNext
      )
      toggleAutoplay()
      expect(isAutoplayActive.value).toBe(true)
    })

    it('stops autoplay when active', () => {
      const { isAutoplayActive, startAutoplay, toggleAutoplay } = useAutoplay(
        { autoplay: 1000, images: mockImages },
        goToNext
      )
      startAutoplay()
      toggleAutoplay()
      expect(isAutoplayActive.value).toBe(false)
    })
  })

  describe('pauseAutoplay / resumeAutoplay', () => {
    it('pauses and resumes autoplay', () => {
      const { isAutoplayActive, startAutoplay, pauseAutoplay, resumeAutoplay } =
        useAutoplay({ autoplay: 1000, images: mockImages }, goToNext)
      startAutoplay()
      pauseAutoplay()
      expect(isAutoplayActive.value).toBe(false)
      resumeAutoplay()
      expect(isAutoplayActive.value).toBe(true)
    })

    it('does not resume if autoplay was never paused', () => {
      const { isAutoplayActive, resumeAutoplay } = useAutoplay(
        { autoplay: 1000, images: mockImages },
        goToNext
      )
      resumeAutoplay()
      expect(isAutoplayActive.value).toBe(false)
    })
  })
})
