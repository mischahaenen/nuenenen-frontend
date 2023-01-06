declare interface IStep {
  id: number
  attributes: {
    Name: string
    Description: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    Quartalsprogramm: any
    Team: any
    Images: any
  }
}

declare interface ISteps {
  data: ISteps[]
}
