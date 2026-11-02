// schema.org descriptions of josh, and of the site, that other structured data refers to.

export function personSchema(siteUrl: string) {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#josh`,
    name: 'Josh Long',
    alternateName: 'starbuxman',
    url: `${siteUrl}/about`,
    image: `${siteUrl}/images/josh-long.jpg`,
    jobTitle: 'Spring Developer Advocate',
    description: siteDescription,
    award: ['Java Champion', 'Google Developer Expert (Kotlin)'],
    knowsAbout: ['Spring', 'Spring Boot', 'Java', 'Kotlin', 'Spring AI', 'GraalVM', 'Cloud native architecture'],
    sameAs: Object.values(profiles),
  }
}

export function websiteSchema(siteUrl: string) {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: siteName,
    publisher: {'@id': `${siteUrl}/#josh`},
    potentialAction: {
      '@type': 'SearchAction',
      target: {'@type': 'EntryPoint', urlTemplate: `${siteUrl}/blog?q={query}`},
      'query-input': 'required name=query',
    },
  }
}

export function graph(...nodes: object[]) {
  return {'@context': 'https://schema.org', '@graph': nodes}
}

// "home > blog > this post", for the trail search engines show above a result.
export function breadcrumbs(siteUrl: string, trail: [name: string, path: string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'] as [string, string], ...trail].map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: siteUrl + path,
    })),
  }
}
