import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasSessionCookie = Boolean(getSessionCookie(req));

  const isAuthRoute = pathname === "/auth" || pathname.startsWith("/auth/");
  const isFormsRoute = pathname === "/forms" || pathname.startsWith("/forms/");

  // Unauthed: root/forms -> login
  if (!hasSessionCookie && (pathname === "/" || isFormsRoute)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Authed: root/auth -> forms
  if (hasSessionCookie && (pathname === "/" || isAuthRoute)) {
    return NextResponse.redirect(new URL("/forms", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/forms/:path*", "/auth/:path*"],
};
