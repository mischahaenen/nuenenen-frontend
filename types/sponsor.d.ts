declare interface Sponsor {
  id: number
  attributes: {
    Name: string
    Description: string
    Logo: {
      data: Image
    }
    Url: string
  }
}

declare interface SponsorResponse {
  data: Sponsor[]
}
