import Image from "next/image";
import { IMAGE_BASE_URL } from "@utils/baseUrl";
import styles from "@styles/page/home.module.css";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className={styles.h1}>댕냥이를 위한 방구석 스튜디오</h1>
      <main>
        <div className={styles.pictureWrapper}>
          <div className={styles.firstPictureWrapper}>
            <div className={styles.textbox}>여러분 우리 댕냥이 좀 보세요</div>
            <Image
              src={IMAGE_BASE_URL + "/dog_with_flower.png"}
              width={280}
              height={280}
              alt="Picture of dog with flower "
            />
          </div>
          <div className={styles.arrowBox} />
          <div className={styles.secondPictureWrapper}>
            <div className={styles.smallHeartBox} />
            <div className={styles.heartBox} />
            <div className={styles.textbox}>#강아지</div>
            <div className={styles.textbox}>#해변</div>
            <Image
              src={IMAGE_BASE_URL + "/dog_with_beach.png"}
              width={280}
              height={280}
              alt="Picture of dog in beach"
            />
          </div>
        </div>
        {children}
      </main>
    </>
  );
}
