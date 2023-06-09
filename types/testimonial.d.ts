declare interface TestimonialAttributes {
  Name: string
  Position: string
  Quote: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  Image: {
    data: Image
  }
}

declare interface Testimonial {
  id: number
  attributes: TestimonialAttributes
}

declare interface TestimonialResponse {
  data: Testimonial[]
}
