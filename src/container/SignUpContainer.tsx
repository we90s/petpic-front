import Button from "#components/Button";
import Input from "#components/Input";
import styles from "#styles/page/signUp.module.css";

export default function SignUpContainer() {
  return (
    <form className={styles.form}>
      <div className={styles.emailWrapper}>
        <Input type="email" label="이메일" placeholder="이메일을 입력하세요" />
        <Button fontSize="md" theme="line01" onClick={() => console.log("asd")}>
          인증번호 받기
        </Button>
      </div>
      <div className={styles.authWrapper}>
        <Input
          type="text"
          label="인증번호"
          placeholder="인증번호 입력"
          errorLabel="인증번호를 확인해주세요"
        />
        <button className={styles.authButton}>인증하기</button>
      </div>
      <Input
        type="password"
        label="비밀번호"
        placeholder="최소 6자 이상 입력"
        errorLabel="비밀번호를 확인해주세요"
      />
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
      />
      <Button fontSize="xl" theme="bg01" onClick={() => console.log("asd")}>
        가입하기
      </Button>
    </form>
  );
}
