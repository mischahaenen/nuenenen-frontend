declare interface Page {
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

declare interface PageResponse {
  data: Page[]
}
