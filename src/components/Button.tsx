import styles from "#styles/components/button.module.css";

export type ButtonType = {
  children: string;
  fontSize: "md" | "xl";
  theme: "main" | "white" | "line01" | "bg01";
  onClick: () => void;
  type?: "submit";
};

const Button = ({ children, theme, fontSize, onClick, type }: ButtonType) => {
  return (
    <button
      className={[styles.button, styles[theme], styles[fontSize]].join(" ")}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
