import { useMemoize } from '@vueuse/core'
import type { PostsResponse, PostsResponse } from '~/types/post'
import { createQuery, fetchFromApi } from '../core/client'

export const useBlogApi = () => {
  const getBlogPosts = useMemoize(async () => {
    return await fetchFromApi<PostsResponse>('blogs', {
      params: {
        populate: '*',
        sort: 'createdAt:desc',
      },
    })
  })

  const getBlogPostsByStep = useMemoize(async (step: string) => {
    const query = createQuery({
      populate: '*',
      filters: {
        step: { Name: { $eq: step } },
      },
    })

    return await fetchFromApi<PostsResponse>(`blogs?${query}`)
  })

  const getBlogPost = useMemoize(async (slug: string) => {
    const query = createQuery({
      populate: '*',
      filters: {
        slug: { $eq: slug },
      },
    })

    return await fetchFromApi<PostsResponse>(`blogs?${query}`)
  })

  return {
    getBlogPosts,
    getBlogPostsByStep,
    getBlogPost,
  }
}
