import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;
    const { pathname } = request.nextUrl;

    const protectedRoutes = ['/pages/dashboard', '/pages/progress', '/pages/gameScreen'];

    if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (token && (pathname === '/' || pathname === '/pages/landingPage')) {
        return NextResponse.redirect(new URL('/pages/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};