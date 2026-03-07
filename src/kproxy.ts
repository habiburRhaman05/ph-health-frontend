import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './interfaces/enum';
import { decodeToken } from './lib/token';
import { refreshTokens, isTokenExpiringSoon, getTokens } from './features/auth/services/auth.services';

const AUTH_ROUTES = ['/sign-in', '/sign-up'];
const PUBLIC_ROUTES = ['/', '/about-us',"/ai"];
const PUBLIC_DYNAMIC_PREFIXES = ['/doctors'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- 1. BACKEND PROXY ---
  if (pathname.startsWith('/backend-api')) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replace('/backend-api', '');
    return NextResponse.rewrite(`http://localhost:8000${url.pathname}`);
  }

  // --- 2. ROUTE TYPE ---
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_DYNAMIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isPublicRoute || isAuthRoute) return NextResponse.next();

  // --- 3. GET TOKENS ---
  let { accessToken, refreshToken } = await getTokens(request);
  const signInUrl = new URL('/sign-in?session=expire', request.url);

  if (!accessToken && !refreshToken) return NextResponse.redirect(signInUrl);

  // --- 4. REFRESH TOKEN IF NEEDED ---
  const tokenExpireSoon = await isTokenExpiringSoon(accessToken!)
  const shouldRefresh = !accessToken || tokenExpireSoon;
  if (shouldRefresh && refreshToken) {
    try {
      const data = await refreshTokens(refreshToken, process.env.API_URL!);
      accessToken = data.data.accessToken;

      const response = NextResponse.next();
      response.cookies.set('accessToken', data.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 10,
        sameSite: 'lax',
      });
      response.cookies.set('better-auth.session_token', data.data.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 10,
        sameSite: 'lax',
      });
      response.cookies.set('refreshToken', data.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
      });

      return response;
    } catch {
      return NextResponse.redirect(signInUrl);
    }
  }

  // --- 5. DECODE USER & ROLE ---
  const userData = accessToken ? await decodeToken(accessToken) : null;
  const userRole = userData?.user?.role as UserRole | undefined;

  // --- 6. ROLE BASED ACCESS ---
  if (pathname.startsWith('/admin') && userRole !== UserRole.ADMIN && userRole !== UserRole.SUPER_ADMIN)
    return NextResponse.redirect(new URL('/unauthorized', request.url));

  if (pathname.startsWith('/doctor/dashboard') && userRole !== UserRole.DOCTOR)
    return NextResponse.redirect(new URL('/unauthorized', request.url));

  if (pathname.startsWith('/patient/dashboard') && userRole !== UserRole.PATIENT)
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};