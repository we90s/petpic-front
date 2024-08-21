"use client";

import Link from "next/link";
import LOGO from "#assets/logo.svg";
import styles from "#styles/components/header.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "app/provider";
import { useRouter } from "next/navigation";
import { signOut } from "#lib/auth";

export default function Header() {
  const router = useRouter();
  const { email, setEmail } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    const response = await fetch("/api/authStatus");
    const data = await response.json();
    if (data.success) {
      if (setEmail) {
        setEmail(data.email);
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const signOutHandler = async () => {
    const data = await signOut();
    if (!data.success) {
      return;
    }
    setIsLoggedIn(false);
    if (setEmail) {
      setEmail("");
    }
    router.push("/");
  };

  useEffect(() => {
    if (email) {
      setIsLoggedIn(true);
    } else {
      checkLoginStatus();
    }
  }, [email]);

  return (
    <div className={styles.header}>
      <Link href="/">
        <LOGO />
      </Link>
      {isLoggedIn ? (
        <div>
          <Link className={styles.signIn} href="/myPage">
            나의 앨범
          </Link>
          <button className={styles.signOut} onClick={signOutHandler}>
            로그아웃
          </button>
        </div>
      ) : (
        <Link className={styles.signIn} href="/signIn">
          로그인
        </Link>
      )}
    </div>
  );
}
