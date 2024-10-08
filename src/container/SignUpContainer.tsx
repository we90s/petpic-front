"use client";

import Button from "@components/Button";
import Input from "@components/Input";
import { useInput } from "@hooks/useInput";
import styles from "@styles/page/signUp.module.css";
import { signUp } from "actions/auth";
import { emailSchema } from "@lib/definitions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { checkAuthenticationCode, getAuthenticationCode } from "@lib/auth";
import SubmitButton from "@components/SubmitButton";
import customToast from "@lib/customToast";

export default function SignUpContainer() {
  const [state, action] = useFormState(signUp, {
    type: "",
    message: "",
  });
  const { input: email, onChange: onChangeEmail } = useInput("");
  const { input: authCode, onChange: onChangeAuthCode } = useInput("");
  const [isActivateAuthCode, setIsActivateAuthCode] = useState(false);
  const [isValidAuthCode, setIsValidAuthCode] = useState<null | boolean>(null);
  const isValidEmail = emailSchema.safeParse(email).success;

  const handleSendAuthCode = async () => {
    const { success, message } = await getAuthenticationCode(email);
    if (success) {
      customToast(true, message);
      setIsActivateAuthCode(true);
    } else {
      customToast(false, message);
    }
  };

  const handleCheckAuthCode = async () => {
    const { success } = await checkAuthenticationCode(email, authCode);
    if (success) {
      setIsValidAuthCode(true);
    } else {
      customToast(false, "인증번호 확인에 실패하였습니다.");
      setIsValidAuthCode(false);
    }
  };

  useEffect(() => {
    if (state.type === "fail") {
      customToast(false, "회원가입에 실패하였습니다.");
    }
  }, [state]);

  return (
    <form action={action} className={styles.form}>
      <div className={styles.emailWrapper}>
        <Input
          id="email"
          onChange={onChangeEmail}
          type="email"
          label="이메일"
          name="email"
          placeholder="이메일을 입력하세요"
          value={email}
          autoFocus
        />
        <Button
          fontSize="md"
          theme="main"
          disabled={!isValidEmail}
          type="button"
          onClick={handleSendAuthCode}
        >
          인증번호 받기
        </Button>
      </div>
      {isActivateAuthCode && (
        <div className={styles.authWrapper}>
          <Input
            onChange={onChangeAuthCode}
            type="text"
            label="인증번호"
            placeholder="인증번호 입력"
            value={authCode}
            isError={isValidAuthCode === false}
            errorLabel="인증번호를 확인해주세요"
          />
          <button
            className={styles.authButton}
            type="button"
            disabled={isValidAuthCode === true}
            onClick={handleCheckAuthCode}
          >
            {isValidAuthCode === true ? "인증완료" : "인증하기"}
          </button>
        </div>
      )}
      <Input
        type="password"
        label="비밀번호"
        name="password"
        placeholder="최소 6자 이상 입력"
        isError={state?.type === "password"}
        errorLabel={state?.message}
      />
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        name="passwordCheck"
        isError={state?.type === "passwordCheck"}
        errorLabel={state?.message}
      />
      <SubmitButton disabled={!isValidAuthCode === true}>가입하기</SubmitButton>
    </form>
  );
}
