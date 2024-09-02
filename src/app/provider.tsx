"use client";

import { SetStateAction, createContext, useState } from "react";

interface AuthContextType {
  email: string;
  setEmail: React.Dispatch<SetStateAction<string>>;
}

interface ImgSrcContextType {
  imgSrc: string;
  setImgSrc: React.Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>({
  email: "",
  setEmail: () => {},
});

export const ImgSrcContext = createContext<ImgSrcContextType>({
  imgSrc: "",
  setImgSrc: () => {},
});

export function ImgSrcProvider({ children }: { children: React.ReactNode }) {
  const [imgSrc, setImgSrc] = useState("");
  const value = {
    imgSrc,
    setImgSrc,
  };
  return (
    <ImgSrcContext.Provider value={value}>{children}</ImgSrcContext.Provider>
  );
}

export default function AuthProvider({
  children,
  initialEmail,
}: {
  children: React.ReactNode;
  initialEmail?: string;
}) {
  const [email, setEmail] = useState(initialEmail ? initialEmail : "");
  const value = {
    email,
    setEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
