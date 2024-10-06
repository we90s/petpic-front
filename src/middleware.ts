import { decrypt } from "@lib/session";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/start", "/myPage"];
const publicRoutes = ["/signIn", "/signUp"];

export async function middleware(request: NextRequest) {
  let path = request.nextUrl.pathname;
  if (path.includes("/start")) {
    path = "/start";
  }
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = request.cookies.get("session")?.value;
  const parsedCookie = cookie ? JSON.parse(cookie) : {};
  const { accessToken, refreshToken } = parsedCookie;
  const session = await decrypt(accessToken);

  const response = NextResponse.next();
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/signIn", request.nextUrl));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/start/:path*", "/myPage/:path*", "/signIn", "/signUp/:path*"],
};
