import type { BlocksContent } from 'vue-strapi-blocks-renderer'

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
  Image: Image
}

interface Document extends PageZoneComponent {
  Title: string
  files: IFile[]
}

interface QPZone extends PageZoneComponent {
  Title: string
  Document: IFile
  Image: Image
}

interface Group extends PageZoneComponent {
  Title: string
  leaders: Leader[]
}

interface ImageZone extends PageZoneComponent {
  Title: string
  Description: string
  images: Image[]
}

interface Testimonial extends PageZoneComponent {
  Title: string
  Subtitle: string
  Description: string
  testimonials: Testimonial[]
}

interface IFrame extends PageZoneComponent {
  Title: string
  Description: string
  iFrame: string
  images: Image[]
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
  sponsors: Sponsor[]
}

interface BlogZone extends PageZoneComponent {
  Title: string
  Description: BlocksContent
  posts: Post[]
}

interface KastenzettelZone extends PageZoneComponent {
  Title: string
  Description: string
  StartDate: string
  EndDate: string
  Location: string
  StartTime: string
  EndTime: string
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
  | KastenzettelZone
  | QPZone

type PageZone = PageZoneItem[]
