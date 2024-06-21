"use client";

import Link from "next/link";
import LOGO from "#assets/logo.svg";
import styles from "#styles/components/header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <LOGO />
      </Link>
      <Link className={styles.signIn} href="/signIn">
        로그인
      </Link>
    </div>
  );
}
