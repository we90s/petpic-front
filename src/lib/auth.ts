"use server";

import { revalidatePath } from "next/cache";
import { createSession, deleteSession, getSession } from "./session";
import { redirect } from "next/navigation";
import { RequestConfig, fetchAPI } from "@utils/fetchAPI";

export async function getAuthenticationCode(email: string) {
  const apiParams: RequestConfig<string> = {
    type: "text",
    url: "/signup/mail",
    method: "POST",
    body: email,
    message: "이미 등록된 이메일입니다.",
  };

  const { message, status } = await fetchAPI(apiParams);

  if (status === 409) {
    return {
      message,
    };
  }
  return { success: true };
}

export async function checkAuthenticationCode(email: string, authCode: string) {
  const body = {
    userMail: email,
    mailType: "mail-validate",
    code: authCode,
  };

  const apiParams: RequestConfig<typeof body> = {
    type: "json",
    url: "/signup/validate",
    method: "POST",
    body: body,
    message: "잘못된 인증 코드입니다.",
  };

  const { message, status } = await fetchAPI(apiParams);

  if (status === 0) {
    // 다른 로직
    return { message };
  }

  if (status >= 500) {
    return { message };
  }

  return { success: true };
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  email?: string;
  error?: unknown | string;
}

export async function checkAuthStatus(): Promise<AuthResponse> {
  const session = getSession();

  if (!session.success) {
    return {
      success: false,
      error: "로그인 되어있지 않음",
    };
  }

  const accessParams: RequestConfig<string> = {
    url: "/auth/validate",
    method: "GET",
    token: session.accessToken,
  };

  const { data: accessData, status } = await fetchAPI(accessParams);

  const username = accessData;

  if (status >= 500) {
    const refreshParams: RequestConfig<string> = {
      type: "json",
      url: "/auth/refresh-token",
      method: "POST",
      token: session.refreshToken,
    };

    const { data: refreshData, status } = await fetchAPI(refreshParams);

    if (status === 0) {
      // 네트워크 오류
      return {
        success: false,
      };
    }

    if (status >= 500) {
      deleteSession();
      return {
        success: false,
        message: "refreshToken이 잘못된걸지도?",
      };
    }

    const newSession = {
      accessToken: refreshData.access_token,
      refreshToken: refreshData.refresh_token,
    };

    createSession(JSON.stringify(newSession));

    return {
      success: true,
      email: refreshData.username,
    };
  }

  return {
    success: true,
    email: username,
  };
}
