declare interface Post {
  id: number
  title: string
  description: string
  step: Step
  createdAt: Date
  author: string
  slug: string
  images: Image[]
}
