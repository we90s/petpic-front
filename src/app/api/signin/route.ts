"use server";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const body = {
    email,
    password,
  };

  try {
    const backendResponse = await fetch(
      `${process.env.BASE_URL}/auth/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json({
        error: "이메일이나 비밀번호가 잘못되었습니다.",
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "네트워크 오류" });
  }
}
