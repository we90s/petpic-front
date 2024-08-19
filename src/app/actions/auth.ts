import { SignUpFormSchema, FormState } from "lib/definitions";

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
