import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const AUTH_PAGES = ["/login"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  let payload = null;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload: verified } = await jwtVerify(token, secret);
      payload = verified;
    } catch {
      payload = null;
    }
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isUserRoute = pathname.startsWith("/user");
  const isSharedProtectedRoute = [
    "/notifications",
    "/profile",
    "/change-password",
  ].some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if ((isAdminRoute || isUserRoute || isSharedProtectedRoute) && !payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAdminRoute && payload?.role !== "admin") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }
  if (isUserRoute && payload?.role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  if (isAuthPage && payload) {
    return NextResponse.redirect(
      new URL(
        payload.role === "admin" ? "/admin/dashboard" : "/user/dashboard",
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/notifications/:path*",
    "/profile/:path*",
    "/change-password",
    "/login",
  ],
};
