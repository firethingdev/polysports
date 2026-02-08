import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-demo-purposes'
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('session')?.value;

    if (!session) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirectTo', '/admin');
      return NextResponse.redirect(url);
    }

    try {
      const { payload } = await jwtVerify(session, JWT_SECRET);
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect customer order routes
  if (pathname.startsWith('/orders')) {
    const session = request.cookies.get('session')?.value;
    if (!session) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirectTo', '/orders');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/orders/:path*'],
};
