import type { ContactSenderReponse } from '~/types/contact-sender'

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

export const getNavigation = () => {
  const { find } = useStrapi4()
  return find<ApiResponse>('api/navigation', {
    populate: 'deep',
  })
}

export const getPage = (url: string) => {
  const { find } = useStrapi4()
  return find<PageResponse>('api/pages', {
    populate: 'deep',
    filters: { url: { $eq: url } },
  })
}

export const getPageWithGraphQL = (slug: string) => {
  const graphql = useStrapiGraphQL()
  return graphql<PageResponse>(`
  query {
  pages(filters: { Slug: { eq: "${slug}" } }) {
    data {
      id
      attributes {
        Title
        Description
        pageZone {
          __typename
          ... on ComponentPagesSection {
            title
            description
          }
        }
      }
    }
    meta {
      pagination {
        page
        pageSize
        total
        pageCount
      }
    }
  }
}
  `)
}

export const getBlogPosts = () => {
  const { find } = useStrapi4()
  return find<PostResponse>('api/blogs', {
    populate: 'deep',
    sort: 'createdAt:desc',
  })
}

export const getBlogPostsByStep = (step: string) => {
  const { find } = useStrapi4()
  return find<PostResponse>('api/blogs', {
    populate: 'deep',
    filters: { step: { Name: { $eq: step } } },
  })
}

export const getBlogPost = (slug: string) => {
  const { find } = useStrapi4()
  return find<PostResponse>('api/blogs', {
    populate: 'deep',
    filters: { slug: { $eq: slug } },
  })
}

export const getStepNames = () => {
  const { find } = useStrapi4()
  return find<Steps>('api/steps', {
    sort: 'id:asc',
    fields: ['Name', 'Slug'],
    populate: 'deep',
  })
}

export const getStep = (slug: string) => {
  const { find } = useStrapi4()
  return useAsyncData(() =>
    find<Steps>('api/steps', {
      populate: 'deep',
      filters: { Slug: { $eq: slug } },
    })
  )
}

export const getStrapiUser = (id: number) => {
  const { find } = useStrapi4()
  return find<UsersResponse>('api/users', {
    populate: 'deep',
    filters: { id: { $eq: id } },
  })
}

export const getEvents = () => {
  const { find } = useStrapi4()
  return find<IEvents>('api/events', {
    populate: 'deep',
    filters: {},
  })
}

export const getTestimonial = (id: number) => {
  const { find } = useStrapi4()
  return useAsyncData(() =>
    find<{ data: Testimonial }>(`api/testimonials/${id}`, {
      populate: 'deep',
    })
  )
}

export const getSponsors = (ids: number[]) => {
  const { find } = useStrapi4()
  return useAsyncData(() =>
    find<SponsorResponse>('api/sponsors', {
      populate: 'deep',
      filters: { id: { $in: ids } },
    })
  )
}

export const createContactEntry = (
  token: string | undefined,
  formData: any
) => {
  const { create } = useStrapi4()
  return useAsyncData(() =>
    create<any>('api/contacts/', {
      formData,
      token,
    })
  )
}

export const getContactDistributionList = (): Promise<ContactSenderReponse> => {
  const { find } = useStrapi4()
  return find<any>('api/contact-distribution-lists/', {
    populate: 'deep',
  })
}

export const getFooter = () => {
  const { find } = useStrapi4()
  return find<IFooter>('api/footer', {
    populate: 'deep',
  })
}
