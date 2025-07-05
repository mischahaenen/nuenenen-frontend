export type Leader = {
  id: number
  Name: string
  Position: string
  Email: string
  Image: Image
}

export type LeaderResponse = {
  data: Leader[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
