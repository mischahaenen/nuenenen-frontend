import { useMemoize } from '@vueuse/core'
import { fetchFromApi } from '../core/client'

export const useEventsApi = () => {
  const getEvents = useMemoize(async () => {
    return await fetchFromApi<IEvents>('events', {
      params: {
        populate: '*',
      },
    })
  })

  return {
    getEvents,
  }
}
