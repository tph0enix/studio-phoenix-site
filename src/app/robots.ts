import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow everyone including AI reference crawlers
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // Block AI training crawlers only
        userAgent: [
          'GPTBot',           // OpenAI training
          'CCBot',            // Common Crawl (feeds many training datasets)
          'Google-Extended',  // Google Gemini training
          'Amazonbot',        // Amazon training
          'Applebot-Extended', // Apple training
          'Bytespider',       // TikTok/ByteDance training
          'meta-externalagent', // Meta training
        ],
        disallow: '/',
      }
    ],
    sitemap: 'https://vector.studiophoenix.ink/sitemap.xml',
  }
}