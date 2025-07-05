import { useMemoize } from '@vueuse/core'
import type { LeaderResponse } from '~/types/leader'
import { fetchFromApi } from '../core/client'

export const useLeaderApi = () => {
  const getLeader = useMemoize(async (id) => {
    return await fetchFromApi<LeaderResponse>(`teams/${id}`, {
      params: {
        populate: '*',
      },
    })
  })

  const getLeaders = useMemoize(async () => {
    return await fetchFromApi<LeaderResponse>(`teams`, {
      params: {
        populate: '*',
      },
    })
  })

  return {
    getLeader,
    getLeaders,
  }
}
