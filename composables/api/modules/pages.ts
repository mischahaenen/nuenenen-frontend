import { useMemoize } from '@vueuse/core'
import { createQuery, fetchFromApi } from '../core/client'
import type { PageResponse } from '~/types/page'

export const usePagesApi = () => {
  const getPage = useMemoize((url: string) => {
    const query = createQuery({
      populate: {
        pageZone: {
          populate: '*',
        },
      },
      filters: {
        url: { $eq: url },
      },
    })

    return fetchFromApi<PageResponse>(`pages?${query}`)
  })

  return {
    getPage,
  }
}
