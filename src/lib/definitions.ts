import { z } from "zod";

export const emailSchema = z.string().email();

export const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "유효한 이메일 형식이 아닙니다.",
      })
      .trim(),
    password: z
      .string()
      .min(6, {
        message: "비밀번호를 6자 이상 입력해주세요.",
      })
      .trim(),
    passwordCheck: z
      .string()
      .min(1, {
        message: "비밀번호 확인을 입력해주세요.",
      })
      .trim(),
  })
  .superRefine(({ password, passwordCheck }, ctx) => {
    if (password !== passwordCheck) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호를 확인해주세요.",
        path: ["passwordCheck"],
      });
    }
  });

export type FormState =
  | {
      success?: boolean;
      errors?: {
        email?: string[];
        password?: string[];
        passwordCheck?: string[];
      };
      message?: string;
    }
  | undefined;
