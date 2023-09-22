import { defineStore } from 'pinia'

export const useDeregisterStore = defineStore({
  id: 'deregister-store',
  state: () => ({
    step: '',
    message: 'Sorry, ich komme nicht 👋🏻',
  }),
  actions: {
    setStep(step: string) {
      this.step = step
    },
  },
  getters: {
    getStep: (state) => state.step,
    getMessage: (state) => state.message,
  },
})
