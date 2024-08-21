"use client";

import Button from "#components/Button";
import Input from "#components/Input";
import Link from "next/link";
import styles from "#styles/page/signIn.module.css";
import { useFormState } from "react-dom";
import { signin } from "#actions/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "app/provider";

export default function SignInContaier() {
  const router = useRouter();
  const [state, action] = useFormState(signin, {
    message: "",
  });

  const { setEmail } = useContext(AuthContext);

  if (state?.email) {
    if (setEmail) {
      setEmail(state?.email);
    }
    router.push("/");
  }

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
          isError={state?.message !== ""}
          errorLabel={state?.message}
          required
        />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          required
        />
        <div className={styles.subText}>
          아직 회원이 아니신가요?
          <Link href="signUp">회원가입</Link>
          <span>|</span>
          <Link href="/">비밀번호 찾기</Link>
        </div>
        <Button type="submit" fontSize="xl" theme="main">
          로그인
        </Button>
      </form>
    </>
  );
}
