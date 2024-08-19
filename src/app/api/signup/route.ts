"use server";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const backendResponse = await fetch(`${process.env.BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username: "" }),
  });

  if (!backendResponse.ok) {
    // Handle errors
  }

  const data = await backendResponse.json();
  return NextResponse.json(data);
}
