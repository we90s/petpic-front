import StartLayout from "#components/StartLayout";
import { IMAGE_BASE_URL } from "#utils/baseUrl";
import Image from "next/image";
import React from "react";
import styles from "#styles/components/uploadImageContainer.module.css";

export default function UploadImageContainer() {
  return (
    <StartLayout progress="second" title="사진을 업로드해 주세요">
      <div>이런 사진이 좋아요</div>
      <div className={styles.container}>
        <div className={styles.goodImageWrapper}>
          <div>
            <Image
              src={IMAGE_BASE_URL + "/goodImage1.png"}
              alt="good image sample1"
              width={160}
              height={160}
            />
            <div>반려동물의 형태가 잘 보이는 사진</div>
          </div>
          <div>
            <Image
              src={IMAGE_BASE_URL + "/goodImage2.png"}
              alt="good image sample2"
              width={160}
              height={160}
            />
            <div>배경과의 경계선이 뚜렷한 사진</div>
          </div>
        </div>
        <div className={styles.badImageWrapper}>
          <div>
            <Image
              src={IMAGE_BASE_URL + "/badImage1.png"}
              alt="bad image sample1"
              width={160}
              height={160}
            />
            <div>반려동물의 형태와 배경이 구분되지 않은 사진</div>
          </div>
          <div>
            <Image
              src={IMAGE_BASE_URL + "/badImage2.png"}
              alt="bad image sample2"
              width={160}
              height={160}
            />
            <div>반려동물의 색과 배경이 비슷한 사진</div>
          </div>
        </div>
      </div>
    </StartLayout>
  );
}
