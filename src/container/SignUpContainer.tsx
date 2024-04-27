import Button from "#components/Button";
import Input from "#components/Input";
import React from "react";
import styled from "styled-components";

export default function SignUpContainer() {
  return (
    <Container>
      <EmailWrapper>
        <Input type="email" label="이메일" placeholder="이메일을 입력하세요" />
        <Button
          fontSize="md"
          $bgColor="line01"
          $textColor="white"
          padding="1.35rem"
        >
          인증번호 받기
        </Button>
      </EmailWrapper>
      {/* <Input
        type="text"
        label="인증번호"
        placeholder="인증번호 입력"
        $marginTop={20}
      /> */}
      <Input
        type="password"
        label="비밀번호"
        placeholder="최소 6자 이상 입력"
        $marginTop={30}
      />
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        $marginTop={20}
      />
      <Button fontSize="xl" $bgColor="bg01" $textColor="white">
        가입하기
      </Button>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 46px;
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;

  & button {
    margin-top: 60px;
  }
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 8px;

  & div {
    flex-grow: 1;
  }

  & button {
    max-width: 114px;
  }
`;
