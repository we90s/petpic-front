import {
  checkAuthenticationCode,
  getAuthenticationCode,
  handleSignUp,
} from "#api/signUp";
import Button from "#components/Button";
import Input from "#components/Input";
import { useInput } from "#hooks/useInput";
import styles from "#styles/page/signUp.module.css";
import { checkValidEmail } from "#utils/checkValidEmail";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SignUpContainer() {
  const router = useRouter();
  const { input: email, onChange: onChangeEmail } = useInput("");
  const { input: authCode, onChange: onChangeAuthCode } = useInput("");
  const { input: password, onChange: onChangePassword } = useInput("");
  const { input: passwordCheck, onChange: onChangePasswordCheck } =
    useInput("");
  const [isActivateAuthCode, setIsActivateAuthCode] = useState(false);
  const [isValidAuthCode, setIsValidAuthCode] = useState<null | boolean>(null);
  const [isValidSignUpButton, setIsValidSignUpButton] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState<null | boolean>(null);
  const isValidPasswordRef = useRef(false);
  const [isValidPasswordCheck, setIsValidPasswordCheck] = useState<
    null | boolean
  >(null);
  const isValidPasswordCheckRef = useRef(false);
  const isValidEmail = checkValidEmail(email);

  useEffect(() => {
    if (
      isValidEmail &&
      authCode !== "" &&
      isValidAuthCode === true &&
      password !== "" &&
      passwordCheck !== ""
    ) {
      setIsValidSignUpButton(true);
    } else {
      setIsValidSignUpButton(false);
    }
  }, [isValidEmail, authCode, isValidAuthCode, password, passwordCheck]);

  const handleSendAuthCode = async () => {
    const success = await getAuthenticationCode(email);
    if (success) {
      setIsActivateAuthCode(true);
    }
  };
  const handleCheckAuthCode = async () => {
    const success = await checkAuthenticationCode(email, authCode);
    if (success) {
      setIsValidAuthCode(true);
    } else {
      setIsValidAuthCode(false);
    }
  };

  const handleSignUpButton = async () => {
    isValidPasswordRef.current = password.length >= 6;
    setIsValidPassword(password.length >= 6);
    isValidPasswordCheckRef.current = password === passwordCheck;
    setIsValidPasswordCheck(password === passwordCheck);
    if (isValidPasswordRef.current && isValidPasswordCheckRef.current) {
      const success = await handleSignUp(email, password);
      if (success) {
        router.push("/signUp/success");
      }
    }
  };
  return (
    <div className={styles.form}>
      <div className={styles.emailWrapper}>
        <Input
          onChange={onChangeEmail}
          type="email"
          label="이메일"
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
        onChange={onChangePassword}
        type="password"
        label="비밀번호"
        placeholder="최소 6자 이상 입력"
        value={password}
        isError={isValidPassword === false}
        errorLabel="비밀번호를 6자 이상 입력해주세요."
      />
      <Input
        onChange={onChangePasswordCheck}
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        value={passwordCheck}
        isError={isValidPasswordCheck === false}
        errorLabel="비밀번호와 다릅니다."
      />
      <Button
        fontSize="xl"
        theme="main"
        type="button"
        disabled={!isValidSignUpButton}
        onClick={handleSignUpButton}
      >
        가입하기
      </Button>
    </div>
  );
}
