import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from './interfaces/enum'
import { decodeToken } from './lib/token';

// 1. Define Route Categories
const AUTH_ROUTES = ['/sign-in', '/sign-up'];
const PUBLIC_ROUTES = ['/', '/about-us'];
const PUBLIC_DYNAMIC_PREFIXES = ['/doctors']; // Matches /doctors/123, etc.

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- 1. HANDLE BACKEND PROXY ---
  if (pathname.startsWith('/backend-api')) {
    return NextResponse.rewrite(new URL('http://localhost:8000', request.url));
  }

  // --- 2. GET USER AUTH STATE ---
  // Replace this with your actual logic (e.g., checking a cookie or JWT)
  const token = request.cookies.get('accessToken')?.value  || request.cookies.get('refreshToken')?.value

  const userData = await decodeToken(token!)
 const userRole = userData.user && userData.user.role as UserRole



  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname) || 
                        PUBLIC_DYNAMIC_PREFIXES.some(prefix => pathname.startsWith(prefix));

  // --- 3. PROTECTION LOGIC ---

  // Redirect authenticated users away from Sign-in/Sign-up
  // if (isAuthRoute && token) {
  //   const dashboardPath = `/${userRole?.toLowerCase()}/dashboard`;
  //   return NextResponse.redirect(new URL(dashboardPath, request.url));
  // }

  // If it's a public route, allow access regardless of auth
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protect Dashboard Routes (Role-Based Access Control)
  // if (!token && !isPublicRoute && !isAuthRoute) {
  //   return NextResponse.redirect(new URL('/sign-in', request.url));
  // }

  // Role Validation (Prevent a PATIENT from visiting /admin/dashboard)
  // if (pathname.startsWith('/admin') && userRole !== UserRole.ADMIN && userRole !== UserRole.SUPER_ADMIN) {
  //   return NextResponse.redirect(new URL('/unauthorized', request.url));
  // }

  // if (pathname.startsWith('/doctor/dashboard') && userRole !== UserRole.DOCTOR) {
  //   return NextResponse.redirect(new URL('/unauthorized', request.url));
  // }

  // if (pathname.startsWith('/patient/dashboard') && userRole !== UserRole.PATIENT) {
  //   return NextResponse.redirect(new URL('/unauthorized', request.url));
  // }

  return NextResponse.next();
}

// Ensure middleware only runs on relevant paths (optimization)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}