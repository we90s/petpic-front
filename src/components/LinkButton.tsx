"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/Button";

type Props = {
  children: ReactNode;
  href: string;
  disabled?: boolean;
};

export default function LinkButton({ children, href, disabled }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push(href);
  };

  return (
    <Button
      theme="main"
      fontSize="xl"
      onClick={handleClick}
      disabled={disabled || isLoading}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
}
