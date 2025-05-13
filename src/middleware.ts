import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  // Check if the user is trying to access a protected route
  if (pathname.startsWith('/[tenantId]') && !token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/(auth)/login', req.url));
  }

  // Allow the request to continue if authenticated or accessing public routes
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};