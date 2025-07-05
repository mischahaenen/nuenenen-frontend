import { useMemoize } from '@vueuse/core'
import type { FooterResonse } from '~/types/footer'
import { fetchFromApi } from '../core/client'

export const useFooterApi = () => {
  const getFooter = useMemoize(async () => {
    return await fetchFromApi<FooterResonse>('footer', {
      params: {
        populate: '*',
      },
    })
  })

  return {
    getFooter,
  }
}
