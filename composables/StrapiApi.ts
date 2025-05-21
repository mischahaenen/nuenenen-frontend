import { useMemoize } from '@vueuse/core'
import qs from 'qs'
import type { ContactSenderReponse } from '~/types/contact-sender'

// Create function to get base URL from runtime config
const getBaseUrl = () => {
  const config = useRuntimeConfig()
  return config.public.strapiUrl
}

// Interface Definitions
interface Attributes {
  createdAt: string
  updatedAt: string
  publishedAt: string
  pages: PageResponse
}
interface Data {
  id: number
  attributes: Attributes
}
interface ApiResponse {
  data: Data
  meta: any
}

// Default fetch options
const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Navigation
export const getNavigation = useMemoize(async () => {
  try {
    const BASE_URL = getBaseUrl()
    return await $fetch<ApiResponse>(`${BASE_URL}/api/navigation`, {
      params: {
        populate: 'pages',
      },
      ...fetchOptions,
    })
  } catch (error) {
    console.error('Error fetching navigation:', error)
    throw error
  }
})

// Pages
export const getPage = useMemoize((url: string) => {
  try {
    const BASE_URL = getBaseUrl()
    const query = qs.stringify(
      {
        populate: {
          pageZone: {
            populate: '*',
          },
        },
        filters: {
          url: { $eq: url },
        },
      },
      { encode: false }
    )

    return $fetch<PageResponse>(`${BASE_URL}/api/pages?${query}`)
  } catch (error) {
    console.error('Error fetching page:', error)
    throw error
  }
})

// Blog Posts
export const getBlogPosts = useMemoize(async () => {
  try {
    const BASE_URL = getBaseUrl()
    return await $fetch<PostResponse>(`${BASE_URL}/api/blogs`, {
      params: {
        populate: '*',
        sort: 'createdAt:desc',
      },
      ...fetchOptions,
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
})

// Blog Posts by Step
export const getBlogPostsByStep = useMemoize(async (step: string) => {
  try {
    const BASE_URL = getBaseUrl()
    const query = qs.stringify(
      {
        populate: '*',
        filters: {
          step: { Name: { $eq: step } },
        },
      },
      { encode: false }
    )

    return await $fetch<PostResponse>(
      `${BASE_URL}/api/blogs?${query}`,
      fetchOptions
    )
  } catch (error) {
    console.error('Error fetching blog posts by step:', error)
    throw error
  }
})

// Blog Post by Slug
export const getBlogPost = useMemoize(async (slug: string) => {
  try {
    const BASE_URL = getBaseUrl()
    const query = qs.stringify(
      {
        populate: '*',
        filters: {
          slug: { $eq: slug },
        },
      },
      { encode: false }
    )

    return await $fetch<PostResponse>(
      `${BASE_URL}/api/blogs?${query}`,
      fetchOptions
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }
})

// Step Names
export const getStepNames = useMemoize(async () => {
  try {
    const BASE_URL = getBaseUrl()
    return await $fetch<Steps>(`${BASE_URL}/api/steps`, {
      params: {
        sort: 'id:asc',
        fields: ['Name', 'Slug'],
        populate: '*',
      },
      ...fetchOptions,
    })
  } catch (error) {
    console.error('Error fetching step names:', error)
    throw error
  }
})

// Step by Slug
export const getStep = useMemoize(async (slug: string) => {
  try {
    const BASE_URL = getBaseUrl()
    const query = qs.stringify(
      {
        populate: '*',
        filters: {
          Slug: { $eq: slug },
        },
      },
      { encode: false }
    )

    return await $fetch<Steps>(`${BASE_URL}/api/steps?${query}`, fetchOptions)
  } catch (error) {
    console.error('Error fetching step:', error)
    throw error
  }
})

// Strapi User by ID
export const getStrapiUser = useMemoize(async (id: number) => {
  try {
    const BASE_URL = getBaseUrl()
    const query = qs.stringify(
      {
        populate: '*',
        filters: {
          id: { $eq: id },
        },
      },
      { encode: false }
    )

    return await $fetch<UsersResponse>(
      `${BASE_URL}/api/users?${query}`,
      fetchOptions
    )
  } catch (error) {
    console.error('Error fetching Strapi user:', error)
    throw error
  }
})

// Events
export const getEvents = useMemoize(async () => {
  try {
    const BASE_URL = getBaseUrl()
    return await $fetch<IEvents>(`${BASE_URL}/api/events`, {
      params: {
        populate: '*',
      },
      ...fetchOptions,
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
})

// Testimonial by ID
export const getTestimonial = useMemoize(async (id: number) => {
  try {
    const BASE_URL = getBaseUrl()
    return await $fetch<Testimonial>(`${BASE_URL}/api/testimonials/${id}`, {
      params: {
        populate: '*',
      },
      ...fetchOptions,
    })
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    throw error
  }
})

// Sponsors by IDs
export const getSponsors = useMemoize(async (ids: number[]) => {
  try {
    const BASE_URL = getBaseUrl()
    const query = qs.stringify(
      {
        populate: '*',
        filters: {
          id: { $in: ids },
        },
      },
      { encode: false }
    )

    return await $fetch<SponsorResponse>(
      `${BASE_URL}/api/sponsors?${query}`,
      fetchOptions
    )
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    throw error
  }
})

// Create Contact Entry
export const createContactEntry = async (
  token: string | undefined,
  formData: any
) => {
  try {
    const BASE_URL = getBaseUrl()
    return await $fetch<any>(`${BASE_URL}/api/contacts`, {
      method: 'POST',
      body: formData,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error('Error creating contact entry:', error)
    throw error
  }
}

// Contact Distribution List
export const getContactDistributionList = async () => {
  try {
    const BASE_URL = getBaseUrl()
    return await $fetch<ContactSenderReponse>(
      `${BASE_URL}/api/contact-distribution-lists`,
      {
        params: {
          populate: '*',
        },
        ...fetchOptions,
      }
    )
  } catch (error) {
    console.error('Error fetching contact distribution list:', error)
    throw error
  }
}

// Footer
export const getFooter = useMemoize(async () => {
  try {
    const BASE_URL = getBaseUrl()
    return await $fetch<IFooter>(`${BASE_URL}/api/footer`, {
      params: {
        populate: '*',
      },
      ...fetchOptions,
    })
  } catch (error) {
    console.error('Error fetching footer:', error)
    throw error
  }
})
