import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const adminPages = ["/admin", "/manage"];

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    if (adminPages.some((url) => req.nextUrl.pathname.startsWith(url)) && token?.role === 'USER') {
      return NextResponse.redirect(new URL('/auth/forbidden', req.url));
    }
    return NextResponse.next();
  }
);

export const config = {
  matcher: ["/admin/:path*", "/students/:path*", "/manage/:path*"],
};
