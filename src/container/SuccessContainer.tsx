import Button, { ButtonType } from "#components/Button";
import Link from "next/link";
import styles from "#styles/components/successContainer.module.css";

type Props = {
  title: string;
  description: string;
  buttons: ButtonLinkType[];
};

type ButtonLinkType = ButtonType & {
  href: string;
};

export default function SuccessContainer({
  title,
  description,
  buttons,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon} />
      <div className={styles.h1}>{title}</div>
      <p className={styles.p}>{description}</p>
      <div className={buttons.length > 1 ? styles.buttonWrapper : ""}>
        {buttons.map((button, index) => {
          const { href, ...buttonProps } = button;
          return (
            <Link href={button.href} key={index}>
              <Button {...buttonProps} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
