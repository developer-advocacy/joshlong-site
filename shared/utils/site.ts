export const siteName = 'JoshLong.com'

export const siteDescription = 'Josh Long is a Spring Developer Advocate, Java Champion, Kotlin Google Developer Expert, '
  + 'author of numerous books, best-selling video trainer, open-source contributor, podcaster and YouTuber: hi, Spring fans!'

// where josh is elsewhere. structured data names these as the same person, and the icons link to them.
export const profiles = {
  linkedin: 'https://www.linkedin.com/in/joshlong',
  twitter: 'https://twitter.com/starbuxman',
  youtube: 'https://www.youtube.com/@coffeesoftware',
  github: 'https://github.com/joshlong',
  springTips: 'https://bit.ly/spring-tips-playlist',
  podcast: 'https://bootifulpodcast.fm',
}

export function postUrl(path: string): string {
  return '/jl/blogPost/' + path
}
