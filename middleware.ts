import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "admin";
    const pathname = req.nextUrl.pathname;

    // Redirect non-admin users trying to access admin routes
    if (pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify protected paths
export const config = {
  matcher: ["/account/:path*", "/orders/:path*", "/admin/:path*"],
};