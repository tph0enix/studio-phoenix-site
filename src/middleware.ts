import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || ''
  const { pathname } = req.nextUrl

  // 1. Log for debugging (Check Vercel Runtime Logs)
  console.log(`[Middleware Check] Host: ${hostname} | Path: ${pathname}`)

  // 2. Use a case-insensitive, partial check for the subdomain
  const isVectorSubdomain = hostname.toLowerCase().startsWith('vector.')

  if (isVectorSubdomain) {
    // 3. If the user manually typed /vector, don't rewrite it again
    if (pathname.startsWith('/vector')) {
      return NextResponse.next()
    }

    // 4. Clean Rewrite
    // We clone the URL to ensure all search params (?query=...) stay intact
    const url = req.nextUrl.clone()
    url.pathname = `/vector${pathname}`
    
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}