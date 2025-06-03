import { get } from "@vercel/edge-config";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const adminPages = ["/admin", "/manage"];

export default withAuth(async function middleware(req) {
  const isInMaintenanceMode = await get("maintenance_enabled");
  if (isInMaintenanceMode) {
    req.nextUrl.pathname = "/maintenance";
    return NextResponse.rewrite(req.nextUrl);
  }
  const { token } = req.nextauth;
  if (adminPages.some((url) => req.nextUrl.pathname.startsWith(url)) && token?.role === "USER") {
    return NextResponse.redirect(new URL("/auth/forbidden", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/students/:path*", "/manage/:path*", "/auth/newUser"],
};
