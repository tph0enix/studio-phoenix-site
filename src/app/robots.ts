import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
        {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/_next/'], // Keep them out of the internal wiring
        },
        {
            // blocks training crawlers only
            userAgent: ['GPTBot', 'CCBot', 'Google-Extended'],
            disallow: '/',
        }
    ],
    sitemap: 'https://vector.studiophoenix.ink/sitemap.xml',
  }
}