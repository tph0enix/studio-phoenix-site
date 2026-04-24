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
            // THE AI BLOCKLIST
            userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'Claude-Web', 'ClaudeBot', 'Google-Extended', 'OAI-SearchBot'],
            disallow: '/',
        }
    ],
    sitemap: 'https://vector.studiophoenix.ink/sitemap.xml',
  }
}