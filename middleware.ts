import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;
    const { pathname } = request.nextUrl;

    // Protected routes that require authentication
    const protectedRoutes = ['/pages/dashboard', '/pages/progress', '/pages/gameScreen'];

    // If accessing protected route without token, redirect to landing page
    if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL('/pages/landingPage', request.url));
    }

    // If logged in and accessing root or landing page, redirect to dashboard
    if (token && (pathname === '/' || pathname === '/pages/landingPage')) {
        return NextResponse.redirect(new URL('/pages/dashboard', request.url));
    }

    return NextResponse.next();
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