import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const email = await request.text();

  try {
    const backendResponse = await fetch(`${process.env.BASE_URL}/signup/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: email,
    });

    if (backendResponse.status === 409) {
      return NextResponse.json({
        error: "이미 등록된 이메일입니다.",
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "인증메일 보내기 실패" });
  }
}
