export interface ContactSender {
  id: number
  attributes: {
    Name: string
    Email: string
  }
}

export interface ContactSenderReponse {
  data: ContactSender[]
}
