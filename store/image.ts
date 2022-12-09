import { defineStore } from 'pinia'

export const useImageStore = defineStore({
  id: 'image-store',
  state: () => {
    return {
      currentSlide: 0,
      images: [] as Iimage[],
    }
  },
  actions: {
    setImages(images: Iimage[]) {
      this.images = [...images]
    },
    nextSlide(index) {
      this.currentSlide = index
    },
    slide(index) {
      this.currentSlide += index
    },
  },
  getters: {
    getImages: (state) => state.images,
    getCurrentSlide: (state) => state.currentSlide,
  },
})
