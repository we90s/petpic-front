"use client";

import { SetStateAction, createContext, useState } from "react";

interface ImgSrcContextType {
  imgSrc: string;
  setImgSrc: React.Dispatch<SetStateAction<string>>;
}

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
