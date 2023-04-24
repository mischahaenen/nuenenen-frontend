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
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  role: Role
  Picture: ImageV2
}

declare interface UsersResponse {
  data: User[]
}
