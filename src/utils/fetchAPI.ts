import { getSession } from "@lib/session";

export interface RequestConfig<T> {
  path: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: T;
  options?: HeadersInit;
}
// 겟 파라미터 처리 추가
// 캐시관련 추가

export interface ApiResponse<R> {
  data?: R | null;
  status: number;
  message?: string;
}

export async function fetchAPI<T, R>({
  path,
  method,
  body,
  options,
}: RequestConfig<T>): Promise<ApiResponse<R>> {
  let url = process.env.BASE_URL + path;
  let token = null;
  const headers: HeadersInit = {};

  const session = getSession();

  // 토큰 설정
  if (session.success) {
    token = session.accessToken;
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 헤더 설정
  if (typeof body === "object") {
    headers["Content-Type"] = "application/json";
  }

  if (options) {
    Object.assign(headers, options);
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  let data: R | null = null;

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      return { status: response.status, message: "잘못된 요청입니다." };
    } else if (response.status >= 500) {
      return { status: response.status, message: "서버 오류입니다." };
    }
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("json")) {
    data = await response.json();
  } else if (contentType && contentType.includes("text")) {
    data = (await response.text()) as unknown as R;
  }
  return { data, status: response.status };
}
