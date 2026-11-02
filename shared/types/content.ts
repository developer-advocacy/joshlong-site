// the shapes the server hands to the pages, already cleaned up from what the graphql api returns.

export interface PostSummary {
  path: string
  title: string
  date: string
  heroImage: string | null
  html: string
  truncated: boolean
}

export interface Post extends PostSummary {
  description: string
  images: string[]
}

export interface PostPage {
  total: number
  offset: number
  pageSize: number
  posts: PostSummary[]
}

export interface Content {
  title: string
  slug: string
  imageUrl: string
  html: string
}

export interface Appearance {
  event: string
  startDate: string
  endDate: string
  time: string
  blurb: string
}

export interface Podcast {
  uid: string
  title: string
  date: string
  description: string
  episodeUri: string
  episodePhotoUri: string
}

export interface Video {
  id: string
  title: string
  description: string
  published: string
  thumbnail: string
}

export interface Talk {
  title: string
  slug: string
  html: string
}
