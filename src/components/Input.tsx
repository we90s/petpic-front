import styles from "#styles/components/input.module.css";

type InputType = {
  label?: string;
  type?: "text" | "password" | "email";
  errorLabel?: string;
  placeholder: string;
};

export default function Input({
  label,
  placeholder,
  type,
  errorLabel,
}: InputType) {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.input} placeholder={placeholder} type={type} />
      {errorLabel && <label className={styles.errorLabel}>{errorLabel}</label>}
    </div>
  );
}
