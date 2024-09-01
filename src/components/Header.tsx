"use client";

import Link from "next/link";
import LOGO from "@assets/logo.svg";
import styles from "@styles/components/header.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "app/provider";
import { useRouter } from "next/navigation";
import { checkAuthStatus, resign, signOut } from "@lib/auth";

export default function Header() {
  const router = useRouter();
  const { email, setEmail } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkLoginStatus = async () => {
    if (email) {
      setIsLoggedIn(true);
      return;
    }
    const data = await checkAuthStatus();
    if (data.success) {
      if (data.email) {
        setEmail(data.email);
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const signOutHandler = async () => {
    const data = await signOut();
    if (data.success) {
      setIsLoggedIn(false);
      setEmail("");
    }
    router.push("/");
  };

  useEffect(() => {
    checkLoginStatus();
  }, [email]);

  return (
    <header className={styles.header}>
      <Link href="/">
        <LOGO />
      </Link>
      {isLoggedIn ? (
        <nav>
          <ul>
            <li>
              <Link className={styles.signIn} href="/myPage">
                마이페이지
              </Link>
            </li>
            <li>
              <button className={styles.signOut} onClick={signOutHandler}>
                로그아웃
              </button>
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
