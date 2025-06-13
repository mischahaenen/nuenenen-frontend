import { useMemoize } from '@vueuse/core'
import { createQuery, fetchFromApi } from '../core/client'

export const useUsersApi = () => {
  const getStrapiUser = useMemoize(async (id: number) => {
    const query = createQuery({
      populate: '*',
      filters: {
        id: { $eq: id },
      },
    })

    return await fetchFromApi<any>(`users?${query}`)
  })

  return {
    getStrapiUser,
  }
}
