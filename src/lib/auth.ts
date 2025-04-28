import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import { env } from "./env";

// Check if the email is from the university
const checkDomain = (email: string) => {
  const arrowDomains = ["@planet.kanazawa-it.ac.jp", "@st.kanazawa-it.ac.jp"];
  const arrowEmails = env.ARROW_EMAILS.split(",");
  if (arrowEmails.includes(email)) {
    return true;
  }
  return arrowDomains.some((domain) => email.endsWith(domain));
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    AzureADB2CProvider({
      tenantId: env.AZURE_AD_B2C_TENANT_NAME,
      clientId: env.AZURE_AD_B2C_CLIENT_ID,
      clientSecret: env.AZURE_AD_B2C_CLIENT_SECRET,
      primaryUserFlow: env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: { params: { scope: "offline_access openid" } },
      client: {
        token_endpoint_auth_method: "none",
      },
      checks: ["pkce", "state"],
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.displayName = token.displayName;
        session.user.image = token.picture;
      }
      return session;
    },
    async signIn({ profile, user, account }) {
      const email = profile?.email ?? profile?.emails?.[0];
      if (!email || !checkDomain(email as string)) return false;
      if (profile && account?.provider === "azure-ad-b2c") {
        // Azure AD B2C の場合のみ名前と表示名の処理
        const { given_name, family_name } = profile;
        user.name = given_name && family_name ? `${family_name} ${given_name}` : profile.name;
        user.displayName = profile?.name ?? "";
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // newUser: '/auth/new-user',
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};
