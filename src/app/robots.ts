import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: [
          'GPTBot',
          'CCBot',
          'Google-Extended',
          'Amazonbot',
          'Applebot-Extended',
          'Bytespider',
          'meta-externalagent',
        ],
        disallow: '/',
      }
    ],
    sitemap: [
      'https://studiophoenix.ink/sitemap.xml',
      'https://vector.studiophoenix.ink/sitemap.xml',
    ],
  }
}