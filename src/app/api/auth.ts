import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getUser(email: any, password: any) {
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
    if (!response.ok) {
      throw new Error("로그인 문제");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
}

export { getUser };
