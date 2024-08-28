import styles from "@styles/components/container.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
