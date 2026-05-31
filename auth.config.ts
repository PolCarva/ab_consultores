import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLogin = pathname === "/admin/login";
      const isAdminArea = pathname.startsWith("/admin");

      if (isAdminArea && !isLogin) {
        return !!auth;
      }
      if (isLogin && auth) {
        return Response.redirect(new URL("/admin/noticias", request.nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
