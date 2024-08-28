import { ReactElement } from "react";
import ProgressBar from "./ProgressBar";
import styles from "@styles/components/startLayout.module.css";
type Props = {
  children: ReactElement[] | ReactElement;
  title: string;
  progress: "first" | "second" | "third";
};

export default function StartLayout({ children, progress, title }: Props) {
  return (
    <div className={styles.layout}>
      <ProgressBar progress={progress} />
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
}
