export type ContactSender = {
  id: number
  Name: string
  Email: string
}

export type ContactSenderResponse = {
  data: ContactSender[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
