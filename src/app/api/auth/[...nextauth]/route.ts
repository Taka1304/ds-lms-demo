import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
