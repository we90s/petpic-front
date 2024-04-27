import Button from "#components/Button";
import Input from "#components/Input";
import theme from "#styles/Theme";
import Link from "next/link";
import styled from "styled-components";

export default function SignInContainer() {
  return (
    <Container>
      <SignInTitle>
        <span>🐶 🐾</span>
        가입하고 무료로 댕냥이 사진을 받아보세요
      </SignInTitle>
      <form>
        <Input
          type="email"
          label="이메일로 로그인"
          placeholder="이메일을 입력해 주세요"
          errorLabel="유효한 이메일 주소를 입력해 주세요"
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          $marginTop={16}
          errorLabel="비밀번호를 확인해 주세요"
        />
        <SignUpAndFindPasswordBox>
          아직 회원이 아니신가요?
          <Link href="signUp">회원가입</Link>
          <span>|</span>
          <Link href="/">비밀번호 찾기</Link>
        </SignUpAndFindPasswordBox>
        <Button type="submit" fontSize="xl" $bgColor="main" $textColor="white">
          로그인
        </Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;
`;

const SignInTitle = styled.h1`
  margin-top: 47px;
  font-size: ${theme.fontSize["2xl"]};
  font-weight: 700;
  line-height: 3.2rem;
  text-align: center;
  margin-bottom: 60px;

  & span {
    display: block;
    line-height: 4.48rem;
    font-size: ${theme.fontSize.h1};
    margin-bottom: 3px;
  }
`;

const SignUpAndFindPasswordBox = styled.div`
  color: ${theme.colors.text03};
  font-size: ${theme.fontSize.md};
  margin: 60px 0px 20px 0px;
  text-align: center;
  & span {
    color: ${theme.colors.line01};
  }
  & a {
    background: transparent;
    border: none;
    padding: 0px 8px;
    color: ${theme.colors.text02};
    text-decoration: none;
  }
`;
