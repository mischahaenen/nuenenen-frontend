declare interface Leader {
  id: number
  attributes: {
    Name: string
    Position: string
    Email: string
    Image: {
      data: Image
    }
  }
}

declare interface LeaderResponse {
  data: User[]
}
