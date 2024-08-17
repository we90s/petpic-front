import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnStart = nextUrl.pathname.startsWith("/start");
      if (isOnStart) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/start", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
