import { useMemoize } from '@vueuse/core'
import { createQuery, fetchFromApi } from '../core/client'

export const useSponsorsApi = () => {
  const getSponsors = useMemoize(async (ids: number[]) => {
    const query = createQuery({
      populate: '*',
      filters: {
        id: { $in: ids },
      },
    })

    return await fetchFromApi<Sponsor[]>(`sponsors?${query}`)
  })

  return {
    getSponsors,
  }
}
