"use server";

import {
  SignUpFormSchema,
  emailSchema,
  FormState,
  SignInSchema,
} from "@lib/definitions";
import { createSession, deleteSession, getSession } from "@lib/session";
import { RequestConfig, fetchAPI } from "@utils/fetchAPI";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(prevState: FormState, formData: FormData) {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      type: validatedFields.error.errors[0].path[0],
      message: validatedFields.error.errors[0].message,
    };
  }

  const { email, password } = validatedFields.data;

  const body = {
    email,
    password,
  };

  const apiParams: RequestConfig<typeof body> = {
    type: "json",
    url: "/auth/authenticate",
    method: "POST",
    body: body,
    token: undefined,
    message: "이메일 또는 비밀번호가 잘못되었습니다.",
  };

  const { data, message, status } = await fetchAPI(apiParams);

  if (status && status >= 500) {
    return {
      type: "fail",
      message,
    };
  }

  const session = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };

  createSession(JSON.stringify(session));

  return { email: data.username, message };
}

export async function signUp(prevState: FormState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordCheck: formData.get("passwordCheck"),
  });

  if (!validatedFields.success) {
    return {
      type: validatedFields.error.errors[0].path[0],
      message: validatedFields.error.errors[0].message,
    };
  }

  const { email, password } = validatedFields.data;

  const body = {
    email,
    password,
    username: "",
  };

  const apiParams: RequestConfig<typeof body> = {
    type: "json",
    url: "/auth/register",
    method: "POST",
    body: body,
    token: undefined,
    message: "회원가입에 실패했습니다.",
  };

  const { data, message, status } = await fetchAPI(apiParams);

  if (status && status >= 500) {
    return {
      type: "fail",
      message,
    };
  }

  const session = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };

  createSession(JSON.stringify(session));

  return { email: data.username, message };
}

export async function signOut() {
  const session = getSession();

  if (!session.success) {
    return;
  }

  const apiParams: RequestConfig<undefined> = {
    type: "json",
    url: "/auth/logout",
    method: "POST",
    token: session.accessToken,
    message: "로그아웃에 실패했습니다.",
  };

  const { status } = await fetchAPI(apiParams);

  if (status && status >= 500) {
    return;
  }

  deleteSession();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function resign() {
  let redirectPath: string | null = null;
  const session = getSession();

  if (!session.success) {
    return;
  }

  const apiParams: RequestConfig<undefined> = {
    type: "json",
    url: "/auth/resign",
    method: "POST",
    token: session.accessToken,
    message: "회원 탈퇴에 실패했습니다.",
  };

  const { status } = await fetchAPI(apiParams);

  if (status && status >= 500) {
    return;
  }

  deleteSession();
  revalidatePath("/", "layout");
  redirect("/resign");
}
