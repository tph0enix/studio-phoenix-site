import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || ''
  const { pathname } = req.nextUrl

  // 1. Identify the target
  const isVectorSubdomain = hostname.toLowerCase().startsWith('vector.')

  // 2. The "Only Touch Pages" Rule
  // We only rewrite if the path is the root (/) OR a sub-page (/about)
  // We EXPLICITLY ignore anything with a dot (files) or Next.js internals
  const isPageRequest = pathname === '/' || (
    !pathname.includes('.') && 
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api/')
  );

  if (isVectorSubdomain && isPageRequest) {
    // Prevent double-rewriting
    if (pathname.startsWith('/vector')) {
      return NextResponse.next()
    }

    console.log(`>>> Mapping Subdomain Page: ${pathname} -> /vector${pathname}`)
    return NextResponse.rewrite(new URL(`/vector${pathname}`, req.url))
  }

  // 3. Everything else (images, css, favicon) passes through untouched to the public folder
  return NextResponse.next()
}