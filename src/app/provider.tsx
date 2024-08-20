"use client";

import { SetStateAction, createContext, useState } from "react";

interface AuthContextType {
  email?: string;
  setEmail?: React.Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState("");
  const value = {
    email,
    setEmail,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
