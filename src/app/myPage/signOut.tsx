"use client";

import Button from "@components/Button";
import { resign } from "@lib/auth";
import { AuthContext } from "app/provider";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const { setEmail } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const resignHandler = async () => {
    if (confirm("정말 탈퇴하시겠습니까?")) {
      setIsLoading(true);
      const data = await resign();
      if (!data.success) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setEmail("");
      router.push("/resign");
    }
  };
  return (
    <>
      <Button
        fontSize="md"
        theme="main"
        disabled={isLoading}
        isLoading={isLoading}
        onClick={resignHandler}
      >
        탈퇴 하기
      </Button>
    </>
  );
}
