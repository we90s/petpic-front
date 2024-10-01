export interface RequestConfig<T> {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  type?: "json" | "text"; // 필요없음
  body?: T;
  token?: string; // 그냥 함수 내에서 처리
  message?: string;
}
// 겟 파라미터 처리 추가
// 캐시관련 추가

export interface ApiResponse<R> {
  data?: R;
  status: number;
  message: string;
}

export async function fetchAPI<T, R>({
  type,
  url,
  method,
  body,
  token,
  message,
}: RequestConfig<T>): Promise<ApiResponse<R>> {
  const headers: HeadersInit = {};

  if (method !== "GET" && type) {
    headers["Content-Type"] =
      type === "json" ? "application/json" : "text/plain";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    let data: R;

    if (!response.ok) {
      return { message: message || "요청 실패", status: response.status };
    }

    if (method === "GET") {
      const textResponse = await response.text();
      data = JSON.parse(textResponse) as R; // 텍스트를 JSON으로 변환
    } else {
      data = await response.json();
    }

    return { data, status: response.status, message: "" };
  } catch (error) {
    // 네트워크 오류인 경우 status code를 0으로 설정
    return { message: "네트워크 오류", status: 0 };
  }
}
