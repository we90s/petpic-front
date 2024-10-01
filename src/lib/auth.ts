"use server";

import { revalidatePath } from "next/cache";
import { createSession, deleteSession, getSession } from "./session";
import { redirect } from "next/navigation";
import { ApiResponse, RequestConfig, fetchAPI } from "@utils/fetchAPI";
import { AuthResponse, AuthStatusResponse } from "@petpicTypes/authResponse";

export async function getAuthenticationCode(email: string) {
  const apiParams: RequestConfig<string> = {
    type: "text",
    url: "/signup/mail",
    method: "POST",
    body: email,
    message: "이미 등록된 이메일입니다.",
  };
  // 백엔드에 에러메시지 추가
  const { message, status } = await fetchAPI(apiParams);

  if (status === 0) {
    return {
      message,
    };
  }
  if (status === 409) {
    return {
      message,
    };
  }
  return { success: true, message: "해당 메일로 인증번호가 발송됐습니다." };
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

export async function checkAuthStatus(): Promise<AuthStatusResponse> {
  const session = getSession();

  if (!session.success) {
    return {
      success: false,
      message: "로그인 되어있지 않음",
    };
  }

  const accessParams: RequestConfig<string> = {
    url: "/auth/validate",
    method: "GET",
    token: session.accessToken,
  };

  const { data: accessData, status }: ApiResponse<string> = await fetchAPI(
    accessParams
  );

  const username = accessData;

  if (status >= 500) {
    const refreshParams: RequestConfig<string> = {
      type: "json",
      url: "/auth/refresh-token",
      method: "POST",
      token: session.refreshToken,
    };

    const {
      data: refreshData,
      status,
      message,
    }: ApiResponse<AuthResponse> = await fetchAPI(refreshParams);

    if (status === 0) {
      // 네트워크 오류
      return {
        success: false,
        message,
      };
    }

    if (status >= 500 || refreshData === undefined) {
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
