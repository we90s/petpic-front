"use server";

import { createSession, deleteSession, getSession } from "./session";

export async function getAuthenticationCode(email: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/signup/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: email,
    });

    if (response.status === 409) {
      return {
        error: "이미 등록된 이메일입니다.",
      };
    }
    return { success: true };
  } catch (error) {
    return { error: "인증메일 보내기 실패" };
  }
}

export async function checkAuthenticationCode(email: string, authCode: string) {
  const body = {
    userMail: email,
    mailType: "mail-validate",
    code: authCode,
  };

  try {
    const response = await fetch(`${process.env.BASE_URL}/signup/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      return { error: "잘못된 인증코드" };
    }
    return { success: true };
  } catch (error) {
    return { error: "인증코드 확인 api 실패" };
  }
}

export async function signOut() {
  const session = getSession();

  if (!session.success) {
    return { error: "로그인 중이 아닙니다!" };
  }
  try {
    const response = await fetch(`${process.env.BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      return {
        error: "로그아웃 실패",
      };
    }

    deleteSession();

    return { success: true };
  } catch (error) {
    return { error: "인증메일 보내기 실패" };
  }
}

interface AuthResponse {
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

  try {
    const validateAccessTokenResponse = await fetch(
      `${process.env.BASE_URL}/auth/validate`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    const username = await validateAccessTokenResponse.text();

    if (!validateAccessTokenResponse.ok) {
      const newAccessTokenResponse = await fetch(
        `${process.env.BASE_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.refreshToken}`,
          },
        }
      );

      if (!newAccessTokenResponse.ok) {
        deleteSession();
        return {
          success: false,
          message: "refreshToken이 잘못된걸지도?",
        };
      }

      const data = await newAccessTokenResponse.json();

      const newSession = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };

      createSession(JSON.stringify(newSession));

      return {
        success: true,
        email: data.username,
      };
    }

    return {
      success: true,
      email: username,
    };
  } catch (error) {
    return { success: false, error };
  }
}

export async function resign() {
  const session = getSession();

  if (!session.success) {
    return {
      error: "로그인 되어있지 않음",
    };
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/auth/resign`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      return {
        error: "회원 탈퇴 실패",
      };
    }

    deleteSession();

    return {
      success: true,
    };
  } catch (error) {
    return { success: false, error };
  }
}
