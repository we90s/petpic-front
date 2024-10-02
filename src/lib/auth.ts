"use server";

import { createSession, getSession } from "./session";
import { ApiResponse, RequestConfig, fetchAPI } from "@utils/fetchAPI";
import { AuthResponse, AuthStatusResponse } from "@petpicTypes/authResponse";

export async function getAuthenticationCode(email: string) {
  const apiParams: RequestConfig<string> = {
    path: "/auth/signup/mail",
    method: "POST",
    body: email,
  };
  const { status } = await fetchAPI(apiParams);

  if (status === 409) {
    return { success: false, message: "이미 가입된 메일입니다." };
  }

  if (status === 200) {
    return {
      success: true,
      message: "해당 메일로 인증번호가 발송되었습니다.",
    };
  }

  return {
    success: false,
    message: "인증번호 보내기가 실패했습니다.",
  };
}

export async function checkAuthenticationCode(email: string, authCode: string) {
  const body = {
    userMail: email,
    mailType: "mail-validate",
    code: authCode,
  };

  const apiParams: RequestConfig<typeof body> = {
    path: "/auth/signup/validate",
    method: "POST",
    body: body,
  };

  const { status } = await fetchAPI(apiParams);
  return { success: status === 200 };
}

export async function checkAuthStatus(): Promise<AuthStatusResponse> {
  const session = getSession();

  if (!session.success) {
    return {
      success: false,
      message: "로그인 되어있지 않음",
    };
  }

  const accessParams: RequestConfig<string> = {
    path: "/auth/validate",
    method: "GET",
  };

  const { data: accessData, status }: ApiResponse<string> = await fetchAPI(
    accessParams
  );

  const username = accessData;

  if (status >= 500) {
    let options = { Authorization: `Bearer ${session.refreshToken}` };
    const refreshParams: RequestConfig<string> = {
      path: "/auth/refresh-token",
      method: "POST",
      options,
    };

    const { data: refreshData, status }: ApiResponse<AuthResponse> =
      await fetchAPI(refreshParams);

    if (status >= 500 || !refreshData) {
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
    email: username || "",
  };
}
