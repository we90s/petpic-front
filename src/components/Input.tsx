import styles from "#styles/components/input.module.css";

type InputType = {
  label?: string;
  type?: "text" | "password" | "email";
  isError?: boolean;
  errorLabel?: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
};

export default function Input({
  label,
  placeholder,
  type,
  isError,
  errorLabel,
  onChange,
  value,
}: InputType) {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
      {isError && errorLabel && (
        <label className={styles.errorLabel}>{errorLabel}</label>
      )}
    </div>
  );
}
