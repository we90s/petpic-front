"use server";

import { SignUpFormSchema, emailSchema, FormState } from "#lib/definitions";
import { createSession } from "#lib/session";

export async function signin(prevState: FormState, formData: FormData) {
  const validatedFields = emailSchema.safeParse(formData.get("email"));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as {
        email?: string[];
      },
      message: "잘못된 이메일 형식입니다.",
    };
  }

  const email = validatedFields.data;
  const password = formData.get("password");

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

    const data = await response.json();

    if (!response.ok) {
      return {
        message: "이메일이나 비밀번호가 잘못되었습니다.",
      };
    }

    const session = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };

    await createSession(JSON.stringify(session));

    return { email: data.username };
  } catch (error) {
    return {
      message: "네트워크 오류",
    };
  }
}

export async function signup(prevState: FormState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordCheck: formData.get("passwordCheck"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const body = {
    email,
    password,
    username: "",
  };

  const response = await fetch(`${process.env.BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return { error: "회원가입 실패" };
  }

  const data = await response.json();

  const session = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };

  await createSession(JSON.stringify(session));

  return data;
}
