"use client";

import Link from "next/link";
import LOGO from "#assets/logo.svg";
import styles from "#styles/components/header.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "app/provider";

export default function Header() {
  const { email, setEmail } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    const response = await fetch("/api/authStatus", {
      method: "POST",
    });
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
        <Link className={styles.signIn} href="/myPage">
          나의 앨범
        </Link>
      ) : (
        <Link className={styles.signIn} href="/signIn">
          로그인
        </Link>
      )}
    </div>
  );
}
