"use client";

import Button from "@components/Button";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const goToStart = () => {
    router.push("/start");
  };
  return (
    <Button theme="main" fontSize="xl" onClick={goToStart}>
      시작하기
    </Button>
  );
}
