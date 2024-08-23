import styles from "#styles/components/button.module.css";

export type ButtonType = {
  children: string | React.ReactNode;
  fontSize: "md" | "xl";
  theme: "main" | "white" | "line01" | "bg01";
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
};

const Button = ({
  children,
  theme,
  fontSize,
  onClick,
  type,
  disabled,
}: ButtonType) => {
  return (
    <button
      className={[
        styles.button,
        disabled ? styles["line01"] : styles[theme],
        styles[fontSize],
      ].join(" ")}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
