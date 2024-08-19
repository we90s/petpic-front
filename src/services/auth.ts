export async function getAuthenticationCode(email: string) {
  const response = await fetch("/api/signup/sendCode", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: email,
  });

  const data = await response.json();

  return data;
}

export async function checkAuthenticationCode(email: string, authCode: string) {
  const body = {
    userMail: email,
    mailType: "mail-validate",
    code: authCode,
  };

  const response = await fetch(`api/signup/checkCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data;
}
