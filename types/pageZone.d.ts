interface PageZoneComponent {
  id: number
  __component: string
}

interface Kastenzeddel extends PageZoneComponent {
  Title: string
  Description: string
  StartDate: string
  EndDate: string
  Location: string
  StartTime: string
  EndTime: string
}
interface Section extends PageZoneComponent {
  Title: string
  Description: string
  Image: {
    data: Image
  }
}

interface Document extends PageZoneComponent {
  Title: string
  files: FilesResponse
}

interface QPZone extends PageZoneComponent {
  Title: string
  Document: {
    data: IFile
  }
  Image: {
    data: Image
  }
}

interface Group extends PageZoneComponent {
  Title: string
  leaders: UsersResponse
}

interface ImageZone extends PageZoneComponent {
  Title: string
  Description: string
  images: ImagesResponse
}

interface Testimonial extends PageZoneComponent {
  Title: string
  Subtitle: string
  Description: string
  testimonials: TestimonialResponse
}

interface IFrame extends PageZoneComponent {
  Title: string
  Description: string
  iFrame: string
  images: ImagesResponse
}

interface ContactZone extends PageZoneComponent {
  Title: string
  Description: string
}

interface StepZone extends PageZoneComponent {
  Title: string
  Description: string
  steps: Steps
}

interface SponsorZone extends PageZoneComponent {
  Title: string
  Description: string
  sponsors: SponsorResponse
}

interface BlogZone extends PageZoneComponent {
  Title: string
  Description: string
  posts: PostResponse
}

type PageZoneItem =
  | Kastenzeddel
  | Section
  | Document
  | Group
  | ImageZone
  | Testimonial
  | IFrame
  | StepZone
  | SponsorZone
  | BlogZone
  | QPZone

type PageZone = PageZoneItem[]
