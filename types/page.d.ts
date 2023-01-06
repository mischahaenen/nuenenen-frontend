declare interface IPage {
  id: number
  attributes: {
    title: string
    description: string
    slug: string
    url: string
    pageZone: IPageZone[]
    created_at: string
    updated_at: string
    published_at: string
  }
}
declare interface IPages {
  data: IPage[]
}
