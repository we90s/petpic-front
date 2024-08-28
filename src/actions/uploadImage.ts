"use server";

import { emailSchema } from "@lib/definitions";
import { redirect } from "next/navigation";

export async function uploadImage(
  imgSrc: string,
  prevState: any,
  formData: FormData
) {
  const validatedFields = emailSchema.safeParse(formData.get("email"));

  if (!validatedFields.success) {
    return {
      message: "잘못된 이메일 형식입니다.",
    };
  }

  const email = validatedFields.data;

  const body = {
    email,
    imgSrc,
  };

  try {
    redirect("/start/uploadImage/success");
  } catch (error) {
    return {
      message: "네트워크 오류",
    };
  }
}
