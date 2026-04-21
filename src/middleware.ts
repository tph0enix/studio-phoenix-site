import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // 1. More permissive check: Does the host contain "vector"?
  const isVectorSubdomain = hostname.toLowerCase().startsWith('vector.')

  if (isVectorSubdomain) {
    // 2. Prevent the middleware from rewriting if we're already "inside" the folder
    if (url.pathname.startsWith('/vector')) {
      return NextResponse.next()
    }

    // 3. The Internal Rewrite
    // This tells Vercel: "The user stays at vector.studiophoenix.ink/ but show them /vector"
    return NextResponse.rewrite(new URL(`/vector${url.pathname}`, req.url))
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