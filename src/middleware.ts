import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(_req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "ADMIN",
    },
    pages: {
      signIn: "/auth/signin",
    },
  },
);

export const config = {
  matcher: ["/admin", "/courses"],
};
