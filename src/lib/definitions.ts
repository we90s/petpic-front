import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, {
    message: "이메일을 입력해주세요.",
  })
  .email({
    message: "유효한 이메일 형식이 아닙니다.",
  })
  .trim();

const passwordSchema = z
  .string()
  .min(6, {
    message: "비밀번호를 6자 이상 입력해주세요.",
  })
  .trim();

const passwordCheckSchema = z
  .string()
  .min(1, {
    message: "비밀번호 확인을 입력해주세요.",
  })
  .trim();

export const SignInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const SignUpFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordCheck: passwordCheckSchema,
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
