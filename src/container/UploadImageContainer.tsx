"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import styles from "@styles/page/uploadImage.module.css";
import X_ICON from "@assets/xIcon.svg";
import { useRouter } from "next/navigation";
import { ImgSrcContext } from "app/provider";
import LinkButton from "@components/LinkButton";

export default function UploadImageContainer() {
  const router = useRouter();
  const { imgSrc, setImgSrc } = useContext(ImgSrcContext);
  const [isDragging, setIsDragging] = useState(false);
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc(e.target?.result);
      }
    };
    setIsDragging(false);
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc(e.target?.result);
      }
    };
  };
  const removeImage = () => {
    setImgSrc("");
  };
  return (
    <>
      <div
        className={
          imgSrc || isDragging
            ? [styles.uploadContainer, styles.activate].join(" ")
            : styles.uploadContainer
        }
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {imgSrc ? (
          <div className={styles.previewContainer}>
            <Image src={imgSrc} alt="image preview" width={150} height={150} />
            <X_ICON fill="#717176" stroke="#717176" onClick={removeImage} />
          </div>
        ) : (
          <>
            <label htmlFor="file">이미지 가져오기</label>
            <input
              onChange={handleImageUpload}
              type="file"
              id="file"
              accept=".jpg, .jpeg, .png"
            />
            <div>드래그로도 선택 가능해요</div>
          </>
        )}
      </div>
      <LinkButton disabled={!imgSrc} href="/start/sendMail">
        업로드하기
      </LinkButton>
    </>
  );
}
