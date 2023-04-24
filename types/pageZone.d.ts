declare interface IPageZone {
  id: number
  Title?: string
  Description?: string
  event?: {
    data: IEvent
  }
  files?: FilesResponse
  images?: ImagesResponse
  members?: UsersResponse
  __component: string
}
