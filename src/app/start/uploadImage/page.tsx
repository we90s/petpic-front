"use client";

import SendMailContainer from "#container/SendMailContainer";
import UploadImageContainer from "#container/UploadImageContainer";
import React, { useState } from "react";

export default function page() {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [mode, setMode] = useState<string>("uploadImage");
  return (
    <>
      {mode === "uploadImage" ? (
        <UploadImageContainer
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          setMode={setMode}
        />
      ) : (
        <SendMailContainer imgSrc={imgSrc} />
      )}
    </>
  );
}
