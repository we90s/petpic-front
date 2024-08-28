import StartLayout from "@components/StartLayout";
import { IMAGE_BASE_URL } from "@utils/baseUrl";
import Image from "next/image";
import styles from "@styles/page/uploadImage.module.css";
import CHECK_ICON from "@assets/checkIcon.svg";
import X_ICON from "@assets/xIcon.svg";

export default function layout({ children }: { children: React.ReactNode }) {
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
              priority
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
              priority
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
              priority
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
              priority
            />
            <div className={styles.text}>
              반려동물의 색과 배경이 <br />
              비슷한 사진
            </div>
          </div>
        </div>
      </div>
      {children}
    </StartLayout>
  );
}
