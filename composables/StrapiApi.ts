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
  return find<IPosts>('api/blogs', {
    populate: '*',
  })
}

export const getBlogPostsByStep = (step: string) => {
  const { find } = useStrapi4()
  return find<IPosts>('api/blogs', {
    populate: '*',
    filters: { step: { Name: { $eq: step } } },
  })
}

export const getBlogPost = (slug: string) => {
  const { find } = useStrapi4()
  return find<IPosts>('api/blogs', {
    populate: '*',
    filters: { slug: { $eq: slug } },
  })
}

export const getStepNames = () => {
  const { find } = useStrapi4()
  return find<ISteps>('api/steps', {
    fields: ['Name', 'Slug', 'logo'],
    populate: '*',
  })
}

export const getStep = (slug: string) => {
  const { find } = useStrapi4()
  return useAsyncData(() =>
    find<ISteps>('api/steps', {
      populate: {
        pageZone: {
          populate: '*',
        },
      },
      filters: { slug: { $eq: slug } },
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

export const getFooter = () => {
  const { find } = useStrapi4()
  return find<IFooter>('api/footer', {
    populate: '*',
  })
}
