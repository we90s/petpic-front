export interface RequestConfig<T> {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  type?: "json" | "text";
  body?: T;
  token?: string;
  message?: string;
}

export async function fetchAPI<T>({
  type,
  url,
  method,
  body,
  token,
  message,
}: RequestConfig<T>) {
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

    let data;

    if (method === "GET") {
      data = await response.text();
    } else {
      data = await response.json();
    }

    if (!response.ok) {
      return { message: message, status: response.status };
    }

    return { data, status: response.status, message: "" };
  } catch (error) {
    return { message: "네트워크 오류", status: 0 };
  }
}
