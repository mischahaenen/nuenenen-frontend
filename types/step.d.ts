declare interface IStep {
  id: number
  attributes: {
    Name: string
    Slug: string
    Description: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    logo: {
      data: Iimage
    }
    pageZone: IPageZone[]
  }
}

declare interface ISteps {
  data: IStep[]
}
