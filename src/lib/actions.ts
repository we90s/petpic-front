"use server";

import { AuthError } from "next-auth";

export async function signInWithCredentials(
  state: { message: unknown } | undefined,
  formData: FormData
) {
  try {
  } catch (error) {
    const errorMessage =
      error instanceof AuthError
        ? error.message
        : "An unexpected error occurred";
    return { message: errorMessage };
  }
}
