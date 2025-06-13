export type Footer = {
  id: number
  Title: string
  Links: Link[]
  Images: Image[]
}

export type FooterResonse = {
  data: Footer[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type Link = {
  Name: string
  Link: string
}
