import { ContactSenderReponse } from '~/types/contact-sender'

export const getPageNavigation = () => {
  const { find } = useStrapi4()
  return find<PageResponse>('api/pages', {
    fields: ['slug', 'url'],
  })
}
export const getPage = (title: string) => {
  const { find } = useStrapi4()
  return find<PageResponse>('api/pages', {
    populate: {
      pageZone: {
        populate: '*',
      },
    },
    filters: { slug: { $eq: title } },
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
    populate: '*',
    sort: 'createdAt:desc',
  })
}

export const getBlogPostsByStep = (step: string) => {
  const { find } = useStrapi4()
  return find<PostResponse>('api/blogs', {
    populate: '*',
    filters: { step: { Name: { $eq: step } } },
  })
}

export const getBlogPost = (slug: string) => {
  const { find } = useStrapi4()
  return find<PostResponse>('api/blogs', {
    populate: '*',
    filters: { slug: { $eq: slug } },
  })
}

export const getStepNames = () => {
  const { find } = useStrapi4()
  return find<Steps>('api/steps', {
    sort: 'id:asc',
    fields: ['Name', 'Slug'],
    populate: '*',
  })
}

export const getStep = (slug: string) => {
  const { find } = useStrapi4()
  return useAsyncData(() =>
    find<Steps>('api/steps', {
      populate: {
        pageZone: {
          populate: '*',
        },
      },
      filters: { Slug: { $eq: slug } },
    })
  )
}

export const getStrapiUser = (id: string) => {
  const { find } = useStrapi4()
  return find<User>('api/users', {
    populate: '*',
    filters: { id: { $eq: id } },
  })
}

export const getEvents = () => {
  const { find } = useStrapi4()
  return find<IEvents>('api/events', {
    populate: '*',
    filters: {},
  })
}

export const getTestimonial = (id: number) => {
  const { find } = useStrapi4()
  return useAsyncData(() =>
    find<{ data: Testimonial }>(`api/testimonials/${id}`, {
      populate: '*',
    })
  )
}

export const getSponsors = (ids: number[]) => {
  const { find } = useStrapi4()
  return useAsyncData(() =>
    find<SponsorResponse>('api/sponsors', {
      populate: '*',
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
      token,
      formData,
    })
  )
}

export const getContactDistributionList = (): Promise<ContactSenderReponse> => {
  const { find } = useStrapi4()
  return find<any>('api/contact-distribution-lists/', {
    populate: '*',
  })
}

export const getFooter = () => {
  const { find } = useStrapi4()
  return find<IFooter>('api/footer', {
    populate: '*',
  })
}
