import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This will log to the Vercel "Logs" tab (Runtime logs)
  console.log('--- GATEKEEPER IGNITED ---');
  console.log('Host:', request.headers.get('host'));
  console.log('Path:', request.nextUrl.pathname);

  const hostname = request.headers.get('host') || '';
  
  if (hostname.includes('vector')) {
    if (!request.nextUrl.pathname.startsWith('/vector')) {
      return NextResponse.rewrite(new URL(`/vector${request.nextUrl.pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

// Ensure this matches EVERYTHING for the test
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};