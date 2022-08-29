declare interface IPost {
  id: number
  attributes: {
    title: string
    description: string
    step: string
    createdAt: Date
    author: string
    images: {
      data: Iimage[]
    }
  }
}

declare interface IPosts {
  data: IPost[]
}
