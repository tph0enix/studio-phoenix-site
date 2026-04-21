import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host')
  const { pathname } = req.nextUrl

  // 1. Target the subdomain
  if (hostname === 'vector.studiophoenix.ink') {
    // 2. Prevent infinite loops if the path already starts with /vector
    if (pathname.startsWith('/vector')) {
      return NextResponse.next()
    }

    // 3. The "Cloak": Internally rewrite / to /vector
    // The user sees vector.studiophoenix.ink/ but the server serves /vector/
    return NextResponse.rewrite(new URL(`/vector${pathname}`, req.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. Static files (favicon, images, etc.)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}