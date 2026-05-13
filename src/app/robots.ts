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
          'GPTBot',           // OpenAI training only - block
          'CCBot',            // Common Crawl training - block
          'Amazonbot',        // Amazon training - block
          'Bytespider',       // TikTok training - block
          'meta-externalagent', // Meta training - block
          // Removed: Google-Extended (blocks AI Overviews)
          // Removed: Applebot-Extended (blocks Apple search)
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