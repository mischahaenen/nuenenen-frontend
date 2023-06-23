declare interface IPageZone {
  id: number
  Title?: string
  Subtitle?: string
  Description?: string
  event?: {
    data: IEvent
  }
  files?: FilesResponse
  images?: ImagesResponse
  Image?: ImagesResponse
  members?: UsersResponse
  testimonials?: TestimonialResponse
  iFrame?: string
  __component: string
}
