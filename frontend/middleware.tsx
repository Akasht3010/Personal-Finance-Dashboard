import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './src/lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/'];
  const isPublicPath = publicPaths.includes(pathname);

  // API routes should be handled separately
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const isAuthenticated = token && verifyToken(token);

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && !isPublicPath) {
    const loginUrl = new URL('/login', request.url);
    // Add a redirect parameter to help with navigation
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access auth pages
  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    // Check if there's a redirect parameter
    const from = request.nextUrl.searchParams.get('from');
    if (from && from !== '/login' && from !== '/register') {
      return NextResponse.redirect(new URL(from, request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Add cache control headers to prevent caching of auth-sensitive pages
  const response = NextResponse.next();
  
  if (!isPublicPath) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
  }

  return response;
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
};