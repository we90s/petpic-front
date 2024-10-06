"use client";

import Input from "@components/Input";
import Link from "next/link";
import styles from "@styles/page/signIn.module.css";
import { useFormState } from "react-dom";
import { signIn } from "@actions/auth";
import SubmitButton from "@components/SubmitButton";
import customToast from "@lib/customToast";

export default function SignInContainer() {
  const [state, action] = useFormState(signIn, {
    type: "",
    message: "",
  });
  return (
    <>
      <div className={styles.h1}>
        <span>🐶 🐾</span>
        가입하고 무료로 댕냥이 사진을 받아보세요
      </div>
      <form action={action} className={styles.form}>
        <Input
          autoFocus
          label="이메일로 로그인"
          id="email"
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요"
          isError={state?.type === "email" || state?.type === "fail"}
          errorLabel={state?.message}
        />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          isError={state?.type === "password"}
          errorLabel={state?.message}
        />
        <div className={styles.subText}>
          아직 회원이 아니신가요?
          <Link href="signUp">회원가입</Link>
          <span>|</span>
          <Link
            href=""
            onClick={() => customToast(false, "현재 개발중입니다!")}
          >
            비밀번호 찾기
          </Link>
        </div>
        <SubmitButton>로그인</SubmitButton>
      </form>
    </>
  );
}
