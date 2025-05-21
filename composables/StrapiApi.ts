import axios from 'axios'
import qs from 'qs'
import type { ContactSenderReponse } from '~/types/contact-sender'

// API Base URL
const config = useRuntimeConfig()
const BASE_URL = config.public.strapiUrl

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

// Create an API instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Navigation
export const getNavigation = async () => {
  const res = await api.get<ApiResponse>('/navigation', {
    params: {
      populate: 'pages',
    },
  })
  return res.data
}

// Pages
const getPage = async (url: string) => {
  try {
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

    return $fetch<PageResponse>(`${BASE_URL}/pages?${query}`)
  } catch (error) {
    console.error('Error fetching page:', error)
    throw error
  }
}

// Blog Posts
export const getBlogPosts = async () => {
  try {
    const res = await api.get<PostResponse>('/blogs', {
      params: {
        populate: '*',
        sort: 'createdAt:desc',
      },
    })
    return res.data
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}

// Blog Posts by Step
export const getBlogPostsByStep = async (step: string) => {
  const query = qs.stringify(
    {
      populate: '*',
      filters: {
        step: { Name: { $eq: step } },
      },
    },
    { encode: false }
  )

  try {
    const res = await api.get<PostResponse>(`/blogs?${query}`)
    return res.data
  } catch (error) {
    console.error('Error fetching blog posts by step:', error)
    throw error
  }
}

// Blog Post by Slug
export const getBlogPost = async (slug: string) => {
  const query = qs.stringify(
    {
      populate: '*',
      filters: {
        slug: { $eq: slug },
      },
    },
    { encode: false }
  )

  try {
    const res = await api.get<PostResponse>(`/blogs?${query}`)
    return res.data
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }
}

// Step Names
export const getStepNames = async () => {
  try {
    const res = await api.get<Steps>('/steps', {
      params: {
        sort: 'id:asc',
        fields: ['Name', 'Slug'],
        populate: '*',
      },
    })
    return res.data
  } catch (error) {
    console.error('Error fetching step names:', error)
    throw error
  }
}

// Step by Slug
export const getStep = async (slug: string) => {
  const query = qs.stringify(
    {
      populate: '*',
      filters: {
        Slug: { $eq: slug },
      },
    },
    { encode: false }
  )

  try {
    const res = await api.get<Steps>(`/steps?${query}`)
    return res.data
  } catch (error) {
    console.error('Error fetching step:', error)
    throw error
  }
}

// Strapi User by ID
export const getStrapiUser = async (id: number) => {
  const query = qs.stringify(
    {
      populate: '*',
      filters: {
        id: { $eq: id },
      },
    },
    { encode: false }
  )

  try {
    const res = await api.get<UsersResponse>(`/users?${query}`)
    return res.data
  } catch (error) {
    console.error('Error fetching Strapi user:', error)
    throw error
  }
}

// Events
export const getEvents = async () => {
  try {
    const res = await api.get<IEvents>('/events', {
      params: {
        populate: '*',
      },
    })
    return res.data
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

// Testimonial by ID
export const getTestimonial = async (id: number) => {
  try {
    const res = await api.get<Testimonial>(`/testimonials/${id}`, {
      params: {
        populate: '*',
      },
    })
    return res.data
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    throw error
  }
}

// Sponsors by IDs
export const getSponsors = async (ids: number[]) => {
  const query = qs.stringify(
    {
      populate: '*',
      filters: {
        id: { $in: ids },
      },
    },
    { encode: false }
  )

  try {
    const res = await api.get<SponsorResponse>(`/sponsors?${query}`)
    return res.data
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    throw error
  }
}

// Create Contact Entry
export const createContactEntry = async (
  token: string | undefined,
  formData: any
) => {
  try {
    const res = await api.post<any>('/contacts', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.error('Error creating contact entry:', error)
    throw error
  }
}

// Contact Distribution List
export const getContactDistributionList = async () => {
  try {
    const res = await api.get<ContactSenderReponse>(
      '/contact-distribution-lists',
      {
        params: {
          populate: '*',
        },
      }
    )
    return res.data
  } catch (error) {
    console.error('Error fetching contact distribution list:', error)
    throw error
  }
}

// Footer
export const getFooter = async () => {
  try {
    const res = await api.get<IFooter>('/footer', {
      params: {
        populate: '*',
      },
    })
    return res.data
  } catch (error) {
    console.error('Error fetching footer:', error)
    throw error
  }
}
