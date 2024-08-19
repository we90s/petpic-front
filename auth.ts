import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";

async function getUser(email: any, password: any) {
  const body = {
    email,
    password,
  };
  try {
    const response = await fetch(`${process.env.BASE_URL}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("로그인 문제");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        authCode: { type: "text" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;
        const { email, authCode, password } = credentials;
        // 회원가입
        if (authCode) {
          return user;
        }
        // 로그인
        user = await getUser(email, password);
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({ token, user }) => {
      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
  },
});
