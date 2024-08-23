import React from "react";
import styles from "#styles/components/checkbox.module.css";

type Props = {
  id: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Checkbox({ id, checked, setChecked }: Props) {
  return (
    <>
      <input
        className={styles.input}
        type="checkbox"
        id={id}
        onChange={(e) => setChecked(!checked)}
        checked={checked}
      />
      <label htmlFor={id} />
    </>
  );
}
