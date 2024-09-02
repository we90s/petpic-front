import styles from "@styles/page/myPage.module.css";
import SignOutButton from "app/myPage/signOut";

export default function MyPageContainer() {
  return (
    <>
      <div className={styles.titleWrapper}>
        <h1>나의 앨범</h1>
      </div>
      <div className={styles.titleWrapper}>
        <h1>탈퇴 하기</h1>
      </div>
      <SignOutButton />
    </>
  );
}
