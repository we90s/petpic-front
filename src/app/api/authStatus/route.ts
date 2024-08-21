import { createSession } from "#lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;

  if (!cookie) {
    return NextResponse.json({
      success: false,
      message: "로그인 되어있지 않습니다.",
    });
  }

  const parsedCookie = cookie ? JSON.parse(cookie) : {};

  try {
    const validateAccessTokenResponse = await fetch(
      `${process.env.BASE_URL}/auth/validate`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parsedCookie?.accessToken}`,
        },
      }
    );

    if (!validateAccessTokenResponse.ok) {
      const newAccessTokenResponse = await fetch(
        `${process.env.BASE_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${parsedCookie?.refreshToken}`,
          },
        }
      );

      if (!newAccessTokenResponse.ok) {
        return NextResponse.json({
          success: false,
          message: "refreshToken이 잘못된걸지도?",
        });
      }

      const data = await newAccessTokenResponse.json();

      const session = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };

      await createSession(JSON.stringify(session));

      return NextResponse.json({
        success: true,
        email: data.username,
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
