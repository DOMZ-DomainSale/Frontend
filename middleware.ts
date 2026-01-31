import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthed = req.cookies.get("site_auth");
  const pathname = req.nextUrl.pathname;

  const publicPaths = [
    "/login",
    "/api/site-login",
    "/api/site-status",
  ];

  const isPublic = publicPaths.some(p => pathname.startsWith(p));

  if (!isAuthed && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};
