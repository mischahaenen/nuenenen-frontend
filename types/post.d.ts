declare interface IPost {
  id: number
  attributes: {
    title: string
    description: string
    step: {
      data: IStep
    }
    createdAt: Date
    author: string
    slug: string
    images: {
      data: Image[]
    }
  }
}

declare interface IPosts {
  data: IPost[]
}
