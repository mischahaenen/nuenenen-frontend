import { useMemoize } from '@vueuse/core'
import type { PageResponse } from '~/types/page'
import { fetchFromApi } from '../core/client'

// Navigation
export const useNavigationApi = () => {
  const getNavigation = useMemoize(async () => {
    return await fetchFromApi<PageResponse>('navigation', {
      params: {
        populate: 'pages',
      },
    })
  })

  return {
    getNavigation,
  }
}
