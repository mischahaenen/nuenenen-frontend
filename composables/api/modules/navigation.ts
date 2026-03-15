import { useMemoize } from '@vueuse/core'
import { fetchFromApi } from '../core/client'
import type { PageResponse } from '~/types/page'

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
