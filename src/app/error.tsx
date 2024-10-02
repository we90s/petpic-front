"use client";

import Button from "@components/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <>
      <h1 className="error">이런! 오류가 났어요. {":("}</h1>
      <Button fontSize="xl" theme="main" onClick={() => reset()}>
        다시 시도하기
      </Button>
    </>
  );
}
