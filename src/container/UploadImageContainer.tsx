import StartLayout from "#components/StartLayout";
import { IMAGE_BASE_URL } from "#utils/baseUrl";
import Image from "next/image";
import React, { SetStateAction, useState } from "react";
import styles from "#styles/page/uploadImage.module.css";
import CHECK_ICON from "#assets/checkIcon.svg";
import X_ICON from "#assets/xIcon.svg";
import Button from "#components/Button";

interface Props {
  imgSrc: string;
  setImgSrc: React.Dispatch<SetStateAction<string>>;
  setMode: React.Dispatch<SetStateAction<string>>;
}

export default function UploadImageContainer({
  imgSrc,
  setImgSrc,
  setMode,
}: Props) {
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
    <StartLayout progress="second" title="사진을 업로드해 주세요">
      <h2 className={styles.title}>이런 사진이 좋아요</h2>
      <div className={styles.container}>
        <div className={styles.goodImageWrapper}>
          <div className={styles.status}>
            <CHECK_ICON />
            Good
          </div>
          <div>
            <Image
              src={IMAGE_BASE_URL + "/goodImage1.png"}
              alt="good image sample1"
              width={160}
              height={160}
            />
            <div className={styles.text}>
              반려동물의 형태가 잘 보이는 <br />
              사진
            </div>
          </div>
          <div>
            <Image
              src={IMAGE_BASE_URL + "/goodImage2.png"}
              alt="good image sample2"
              width={160}
              height={160}
            />
            <div className={styles.text}>
              배경과의 경계선이 <br />
              뚜렷한 사진
            </div>
          </div>
        </div>
        <div className={styles.badImageWrapper}>
          <div className={styles.status}>
            <X_ICON fill="#EA4335" stroke="#EA4335" />
            Bad
          </div>
          <div>
            <Image
              src={IMAGE_BASE_URL + "/badImage1.png"}
              alt="bad image sample1"
              width={160}
              height={160}
            />
            <div className={styles.text}>
              반려동물의 형태와 배경이
              <br />
              구분되지 않은 사진
            </div>
          </div>
          <div>
            <Image
              src={IMAGE_BASE_URL + "/badImage2.png"}
              alt="bad image sample2"
              width={160}
              height={160}
            />
            <div className={styles.text}>
              반려동물의 색과 배경이 <br />
              비슷한 사진
            </div>
          </div>
        </div>
      </div>
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
            <input onChange={handleImageUpload} type="file" id="file" />
            <div>드래그로도 선택 가능해요</div>
          </>
        )}
      </div>
      <Button
        theme="main"
        fontSize="xl"
        disabled={!imgSrc}
        onClick={() => setMode("sendMail")}
      >
        업로드 하기
      </Button>
    </StartLayout>
  );
}
