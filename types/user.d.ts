declare interface Role {
  id: number
  name: string
  description: string
  type: string
  createdAt: string
  updatedAt: string
}
declare interface User {
  id: number
  attributes: {
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    role: Role
    Picture: {
      data: Image
    }
    Position: string
  }
}

declare interface UsersResponse {
  data: User[]
}
