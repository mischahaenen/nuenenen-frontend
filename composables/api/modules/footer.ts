import { useMemoize } from '@vueuse/core'
import { fetchFromApi } from '../core/client'
import type { FooterResonse } from '~/types/footer'

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
