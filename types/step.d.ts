export type Step = {
  id: number
  Name: string
  Slug: string
  Description: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  logo: Image
  event: Event
  pageZone: PageZone
}

export type StepResponse = {
  data: Step[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
