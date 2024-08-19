"use server";

import { getUser } from "#api/auth";
import { AuthError } from "next-auth";

export async function signInWithCredentials(
  state: { message: unknown } | undefined,
  formData: FormData
) {
  try {
    await getUser(formData.get("email") || "", formData.get("password") || "");
  } catch (error) {
    const errorMessage =
      error instanceof AuthError
        ? error.message
        : "An unexpected error occurred";
    return { message: errorMessage };
  }
}
