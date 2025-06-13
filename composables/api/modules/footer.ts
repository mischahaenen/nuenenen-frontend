import { useMemoize } from '@vueuse/core'
import { fetchFromApi } from '../core/client'

export const useFooterApi = () => {
  const getFooter = useMemoize(async () => {
    return await fetchFromApi<IFooter>('footer', {
      params: {
        populate: '*',
      },
    })
  })

  return {
    getFooter,
  }
}
