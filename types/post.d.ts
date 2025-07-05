import type { BlocksContent } from 'vue-strapi-blocks-renderer'

export type Post = {
  id: number
  title: string
  description: BlocksContent
  step: Step
  createdAt: Date
  author: string
  slug: string
  images: Image[]
}

export type PostsResponse = {
  data: Post[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
