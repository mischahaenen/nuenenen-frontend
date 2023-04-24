declare interface IFooter {
  data: {
    id: number
    attributes: {
      Title: string
      Links: Link[]
      Images: {
        data: Image[]
      }
    }
  }
}
declare interface ILink {
  Name: string
  Link: string
}
