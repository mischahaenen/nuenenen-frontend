declare interface Post {
  id: number
  attributes: {
    title: string
    description: string
    step: {
      data: Step
    }
    createdAt: Date
    author: string
    slug: string
    images: {
      data: Image[]
    }
  }
}

declare interface PostResponse {
  data: Post[]
}
