declare interface Step {
  id: number
  Name: string
  Slug: string
  Description: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  logo: Image
  event: IEvent
  pageZone: PageZone
}
