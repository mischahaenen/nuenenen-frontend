export type Page = {
  id: number
  title: string
  description: string
  slug: string
  url: string
  ActionButtonName: string
  ActionButtonLink: string
  pageZone: PageZone
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type PageResponse = {
  data: Page[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
