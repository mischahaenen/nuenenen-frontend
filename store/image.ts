import { defineStore } from 'pinia'

export const useImageStore = defineStore({
  id: 'image-store',
  state: () => {
    return {
      currentSlide: 0,
      images: ([] as Iimage[]) || null,
    }
  },
  actions: {
    setImages(images: Iimage[]) {
      this.images = [...images]
    },
    setCurrentSlide(index: number) {
      this.currentSlide = index
    },
    slide(index: number) {
      this.currentSlide += index
    },
  },
  getters: {
    getImages: (state) => state.images,
    getCurrentIndex: (state) => state.currentSlide,
    getCurrentSlide: (state) => state.images[state.currentSlide],
  },
})
