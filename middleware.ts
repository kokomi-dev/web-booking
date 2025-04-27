import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

import { NextRequest, NextResponse } from "next/server";

// private router
const protectedRoutes = ["/contact", "/account", "/settings", "/booking"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get("auth-token")?.value;

  if (!authToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
