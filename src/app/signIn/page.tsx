"use client";

import Button from "#components/Button";
import Input from "#components/Input";
import Link from "next/link";
import styles from "#styles/page/signIn.module.css";

export default function SignIn() {
  return (
    <>
      <div className={styles.h1}>
        <span>🐶 🐾</span>
        가입하고 무료로 댕냥이 사진을 받아보세요
      </div>
      <form className={styles.form}>
        <Input
          type="email"
          label="이메일로 로그인"
          placeholder="이메일을 입력해 주세요"
          errorLabel="유효한 이메일 주소를 입력해 주세요"
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          errorLabel="비밀번호를 확인해 주세요"
        />
        <div className={styles.subText}>
          아직 회원이 아니신가요?
          <Link href="signUp">회원가입</Link>
          <span>|</span>
          <Link href="/">비밀번호 찾기</Link>
        </div>
        <Button
          type="submit"
          fontSize="xl"
          theme="main"
          onClick={() => console.log("Asd")}
        >
          로그인
        </Button>
      </form>
    </>
  );
}
