import { SignUpFormSchema, emailSchema, FormState } from "#lib/definitions";

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = emailSchema.safeParse(formData.get("email"));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const email = validatedFields.data;
  const password = formData.get("password");

  const body = {
    email,
    password,
  };

  const response = await fetch("/api/signin", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("로그인 오류");
  }

  const data = await response.json();
  return data;
}

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordCheck: formData.get("passwordCheck"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const body = {
    email,
    password,
  };

  const response = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("회원가입 오류");
  }

  const data = await response.json();
  return data;
}
