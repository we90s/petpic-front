import Image from "next/image";
import styles from "#styles/components/selectImageWithText.module.css";
import Link from "next/link";
type Props = {
  src: string;
  altText: string;
  text: string;
  url: string;
};

export default function SelectImageWithText({
  src,
  altText,
  text,
  url,
}: Props) {
  return (
    <Link
      href={`/start/uploadImage?theme=${url}`}
      style={{ textDecoration: "none" }}
    >
      <div className={styles.selectImageWithTextBox}>
        <Image src={src} width={218} height={218} alt={altText} priority />
        <div className={styles.textBox}>{text}</div>
      </div>
    </Link>
  );
}
