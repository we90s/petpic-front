import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getAuthenticationCode(email: string) {
  const response = await fetch(`/signup/mail`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: email,
  });

  return response.ok;
}

async function checkAuthenticationCode(email: string, authCode: string) {
  const body = {
    userMail: email,
    mailType: "mail-validate",
    code: authCode,
  };

  const response = await fetch(`/signup/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.ok;
}

async function handleSignUp(email: string, password: string) {
  const body = {
    email: email,
    password: password,
    username: "",
  };
  const response = await fetch(`/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.ok;
}

export { getAuthenticationCode, checkAuthenticationCode, handleSignUp };
