import { useMemoize } from '@vueuse/core'
import { createQuery, fetchFromApi } from '../core/client'
import type { LeaderResponse } from '~/types/leader'

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
    return await fetchFromApi<LeaderResponse>(`teams?${query}`)
  })

  return {
    getLeader,
    getLeaders,
  }
}
