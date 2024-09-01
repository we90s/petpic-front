"use client";

import { useFormStatus } from "react-dom";
import Button from "@components/Button";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
};

export default function SubmitButton({ children, disabled }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      fontSize="xl"
      theme="main"
      disabled={disabled || pending}
      isLoading={pending}
    >
      {children}
    </Button>
  );
}
