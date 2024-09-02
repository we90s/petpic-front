import styles from "@styles/components/button.module.css";
import Spinner from "@assets/spinner.svg";

export type ButtonType = {
  children: string | React.ReactNode;
  fontSize: "md" | "xl";
  theme: "main" | "white" | "line01" | "bg01";
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
  isLoading?: boolean;
};

const Button = ({
  children,
  theme,
  fontSize,
  onClick,
  type,
  disabled,
  isLoading = false,
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
      {isLoading ? <Spinner fill="white" /> : children}
    </button>
  );
};

export default Button;
