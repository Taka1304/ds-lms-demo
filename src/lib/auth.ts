import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "./env";

// Check if the email is from the university
const checkDomain = (email: string) => {
  const arrowDomains = ["@planet.kanazawa-it.ac.jp", "@st.kanazawa-it.ac.jp"];
  return arrowDomains.some((domain) => email.endsWith(domain));
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // TODO:
    // GithubProvider({
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    // }),
    // AzureADProvider({
    //   clientId: env.AZURE_CLIENT_ID,
    //   clientSecret: env.AZURE_CLIENT_SECRET,
    //   tenantId: env.AZURE_TENANT_ID,
    // }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({ profile }) {
      if (!profile) return false;
      return checkDomain(profile.email as string);
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // newUser: '/auth/new-user',
  },
};
