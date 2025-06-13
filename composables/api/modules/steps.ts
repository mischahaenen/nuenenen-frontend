import { useMemoize } from '@vueuse/core'
import type { StepResponse } from '~/types/step'
import { createQuery, fetchFromApi } from '../core/client'

export const useStepsApi = () => {
  const getSteps = useMemoize(async () => {
    return await fetchFromApi<StepResponse>('steps', {
      params: {
        sort: 'id:asc',
        fields: ['Name', 'Slug', 'Description'],
        populate: 'logo',
      },
    })
  })

  const getStepNames = useMemoize(async () => {
    return await fetchFromApi<StepResponse>('steps', {
      params: {
        sort: 'id:asc',
        fields: ['Name', 'Slug'],
      },
    })
  })

  const getStep = useMemoize(async (slug: string) => {
    const query = createQuery({
      populate: '*',
      filters: {
        Slug: { $eq: slug },
      },
    })

    return await fetchFromApi<StepResponse>(`steps?${query}`)
  })

  return {
    getStepNames,
    getStep,
    getSteps,
  }
}
