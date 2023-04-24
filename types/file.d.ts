declare interface File {
  id: number
  attributes: {
    name: string
    alternativeText: string | null
    caption: string | null
    width: number | null
    height: number | null
    formats: any | null
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any | null
    createdAt: string
    updatedAt: string
  }
}

export interface FilesResponse {
  data: File[]
}
