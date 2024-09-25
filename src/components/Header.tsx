import Link from "next/link";
import LOGO from "@assets/logo.svg";
import styles from "@styles/components/header.module.css";
import { signOut } from "@actions/auth";
import { AuthStatusResponse } from "@petpicTypes/authResponse";

export default function Header({ authData }: { authData: AuthStatusResponse }) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <LOGO />
      </Link>
      {authData.success ? (
        <nav>
          <ul>
            <li>
              <Link className={styles.signIn} href="/myPage">
                마이페이지
              </Link>
            </li>
            <li>
              <form action={signOut}>
                <button className={styles.signOut}>로그아웃</button>
              </form>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link className={styles.signIn} href="/signIn">
                로그인
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
