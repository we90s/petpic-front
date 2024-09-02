import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export function createSession(session: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (session) {
      const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ["HS256"],
      });
      return payload;
    }
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export function getSession() {
  const cookie = cookies().get("session")?.value;
  if (!cookie) {
    return {
      success: false,
    };
  }
  const { accessToken, refreshToken } = JSON.parse(cookie);

  return {
    success: true,
    accessToken,
    refreshToken,
  };
}

export function deleteSession() {
  cookies().delete("session");
}
