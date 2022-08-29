declare interface IimageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string
  width: number
  height: number
  size: number
  url: string
}

declare interface Iimage {
  id: number
  attributes: {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
      thumbnail: IimageFormat
      large: IimageFormat
      medium: IimageFormat
      small: IimageFormat
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string
    provider: string
    provider_metadata: string
    createdAt: Date
    updatedAt: Date
  }
}
