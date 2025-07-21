import { useMemoize } from '@vueuse/core'
import type { LeaderResponse } from '~/types/leader'
import { createQuery, fetchFromApi } from '../core/client'

export const useLeaderApi = () => {
  const getLeader = useMemoize(async (id) => {
    return await fetchFromApi<LeaderResponse>(`teams/${id}`, {
      params: {
        populate: '*',
      },
    })
  })

  const getLeaders = useMemoize(async () => {
    const query = createQuery({
      populate: '*',
      pagination: {
        pageSize: 100,
      },
    })
    console.log('Fetching leaders with query:', query)
    return await fetchFromApi<LeaderResponse>(`teams?${query}`)
  })

  return {
    getLeader,
    getLeaders,
  }
}
