import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const studioPages = [
    {
      url: 'https://studiophoenix.ink',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ]

  const vectorPages = [
    {
      url: 'https://vector.studiophoenix.ink',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: 'https://vector.studiophoenix.ink/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://vector.studiophoenix.ink/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://vector.studiophoenix.ink/cookies',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  return [...studioPages, ...vectorPages]
}