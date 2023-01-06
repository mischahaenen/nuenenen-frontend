declare interface IEvent {
  id: number
  attributes: {
    Title: string
    Description: string
    Location: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    DateStart: Date
    DateEnd: Date
    step: any
  }
}

declare interface IEvents {
  data: IEvent[]
}
