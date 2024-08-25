import Button, { ButtonType } from "@components/Button";
import Link from "next/link";
import styles from "@styles/components/successContainer.module.css";

type Props = {
  title: string;
  description: string | React.ReactNode;
  buttons: ButtonLinkType[];
  newTap?: boolean;
};

export type ButtonLinkType = ButtonType & {
  href: string;
};

export default function SuccessContainer({
  title,
  description,
  buttons,
  newTap,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon} />
      <div className={styles.h1}>{title}</div>
      <p className={styles.p}>{description}</p>
      {buttons.length > 1 && (
        <div className={styles.buttonDescription}>메일함 바로가기</div>
      )}
      <div className={buttons.length > 1 ? styles.buttonWrapper : ""}>
        {buttons.map((button, index) => {
          const { href, ...buttonProps } = button;
          return (
            <Link
              href={button.href}
              key={index}
              target={newTap ? "_blank" : ""}
            >
              <Button {...buttonProps} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
