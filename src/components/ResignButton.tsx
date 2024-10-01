"use client";

import { resign } from "@actions/auth";
import SubmitButton from "@components/SubmitButton";

export default function ResignButton() {
  const handleResign = () => {
    if (confirm("정말 탈퇴하시겠습니까?")) {
      resign();
    }
  };
  return (
    <form action={handleResign}>
      <SubmitButton>탈퇴하기</SubmitButton>
    </form>
  );
}
