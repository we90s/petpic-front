"use server";

import { SignUpFormSchema, FormState, SignInSchema } from "@lib/definitions";
import { createSession, deleteSession, getSession } from "@lib/session";
import { AuthResponse } from "@petpicTypes/authResponse";
import { ApiResponse, RequestConfig, fetchAPI } from "@utils/fetchAPI";
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
    path: "/auth/authenticate",
    method: "POST",
    body: body,
  };

  const { data, status }: ApiResponse<AuthResponse> = await fetchAPI(apiParams);

  if (status >= 400 && status < 500) {
    return { type: "fail", message: "이메일이나 비밀번호가 잘못되었습니다." };
  }

  if (data) {
    const session = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      email: data.username,
    };
    createSession(JSON.stringify(session));
    redirect("/");
  }
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
    path: "/auth/register",
    method: "POST",
    body: body,
  };

  const { data, status }: ApiResponse<AuthResponse> = await fetchAPI(apiParams);

  if (data) {
    const session = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };

    createSession(JSON.stringify(session));

    redirect("/signUp/success");
  }
}

export async function signOut() {
  const session = getSession();

  if (!session.success) {
    return;
  }

  const apiParams: RequestConfig<undefined> = {
    path: "/auth/logout",
    method: "POST",
  };

  const { status } = await fetchAPI(apiParams);

  if (status === 200) {
    deleteSession();
    revalidatePath("/", "layout");
    redirect("/");
  }
}

export async function resign() {
  const session = getSession();

  if (!session.success) {
    return;
  }

  const apiParams: RequestConfig<undefined> = {
    path: "/auth/resign",
    method: "POST",
  };

  const { status } = await fetchAPI(apiParams);

  if (status && status >= 500) {
    return;
  }

  deleteSession();
  revalidatePath("/", "layout");
  redirect("/resign");
}
