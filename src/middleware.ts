import { decrypt } from "#lib/session";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/start"];
const publicRoutes = ["/signIn", "/signUp"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = request.cookies.get("session")?.value;
  const parsedCookie = cookie ? JSON.parse(cookie) : {};
  const { accessToken, refreshToken } = parsedCookie;
  const session = await decrypt(accessToken);

  const response = NextResponse.next();

  if (isProtectedRoute && !session?.sub) {
    return NextResponse.redirect(new URL("/signIn", request.nextUrl));
  }

  if (isPublicRoute && session?.sub) {
    return NextResponse.redirect(new URL("/start", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
