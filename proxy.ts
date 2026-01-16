import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/_lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = await auth.api.getSession({ headers: req.headers });
  const isVerified = Boolean(session?.user?.emailVerified);

  const isAuthRoute = pathname === "/auth" || pathname.startsWith("/auth/");
  const isConfirmRoute =
    pathname === "/auth/signup/confirm" ||
    pathname.startsWith("/auth/signup/confirm/");

  if (isAuthRoute) {
    if (!session) {
      if (isConfirmRoute) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }

      return NextResponse.next();
    }

    if (!isVerified && !isConfirmRoute) {
      return NextResponse.redirect(new URL("/auth/signup/confirm", req.url));
    }

    if (isVerified) {
      return NextResponse.redirect(new URL("/forms", req.url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!isVerified && !isConfirmRoute) {
    return NextResponse.redirect(new URL("/auth/signup/confirm", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
