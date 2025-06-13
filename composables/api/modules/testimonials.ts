import { useMemoize } from '@vueuse/core'
import { fetchFromApi } from '../core/client'

export const useTestimonialsApi = () => {
  const getTestimonial = useMemoize(async (id: number) => {
    return await fetchFromApi<Testimonial>(`testimonials/${id}`, {
      params: {
        populate: '*',
      },
    })
  })

  return {
    getTestimonial,
  }
}
