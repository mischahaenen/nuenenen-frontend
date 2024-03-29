declare interface Step {
  id: number
  attributes: {
    Name: string
    Slug: string
    Description: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    logo: {
      data: Image
    }
    event: {
      data: IEvent
    }
    pageZone: PageZone
  }
}

declare interface Steps {
  data: Step[]
}
