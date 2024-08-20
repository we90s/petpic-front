import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userMail, mailType, code } = await request.json();

  const body = {
    userMail,
    mailType,
    code,
  };

  try {
    const backendResponse = await fetch(
      `${process.env.BASE_URL}/signup/validate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!backendResponse.ok) {
      return NextResponse.json({ error: "잘못된 인증코드" });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "인증코드 확인 api 실패" });
  }
}
