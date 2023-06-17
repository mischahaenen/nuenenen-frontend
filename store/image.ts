import { defineStore } from 'pinia'

export const useImageStore = defineStore({
  id: 'image-store',
  state: () => ({
    currentSlide: 0,
    images: ([] as Image[]) || null,
  }),
  actions: {
    setImages(images: Image[]) {
      this.images = [...images]
    },
    setCurrentSlide(index: number) {
      // Prevent index out of range
      if (index >= 0 && index < this.images.length) {
        this.currentSlide = index
      }
    },
    slide(n: number) {
      let newIndex = this.currentSlide + n
      if (newIndex < 0) {
        newIndex = this.images.length - 1 // wrap to the last image
      } else if (newIndex >= this.images.length) {
        newIndex = 0 // wrap to the first image
      }
      this.currentSlide = newIndex
    },
    cleanup() {
      this.currentSlide = 0
      this.images = []
    },
  },
  getters: {
    getImages: (state) => state.images,
    getCurrentIndex: (state) => state.currentSlide,
    getCurrentSlide: (state) => state.images[state.currentSlide],
  },
})
