import styles from "#styles/components/input.module.css";

type InputType = {
  id?: string;
  name?: string;
  label?: string;
  type?: "text" | "password" | "email";
  isError?: boolean;
  errorLabel?: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  autoFocus?: boolean;
  required?: boolean;
};

export default function Input({
  id,
  name,
  label,
  placeholder,
  type,
  isError,
  errorLabel,
  onChange,
  value,
  autoFocus,
  required,
}: InputType) {
  return (
    <div>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        name={name}
        autoFocus={autoFocus}
        className={styles.input}
        id={id}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        required={required}
      />
      {isError && errorLabel && (
        <label className={styles.errorLabel}>{errorLabel}</label>
      )}
    </div>
  );
}
