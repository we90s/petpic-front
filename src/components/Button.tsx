import theme from "#styles/Theme";
import { COLORS_TYPE, colors } from "colors";
import styled from "styled-components";

// 재사용 가능한 버튼 스타일 정의

export type ButtonType = {
  children: string;
  fontSize: "md" | "xl";
  $bgColor: "main" | "white" | "bg01" | "line01";
  $textColor: "text01" | "text03" | "white";
  fontWeight?: "500";
  padding?: string;
  type?: "submit";
  $marginTop?: number;
  $maxWidth?: string;
};

const StyledButton = styled.button<ButtonType>`
  padding: ${({ padding }) => padding || "20px"};
  font-size: ${({ fontSize }) => theme.fontSize[fontSize]};
  border: 1px solid
    ${({ $textColor }) =>
      $textColor !== "white" ? theme.colors.line01 : "transparent"};
  border-radius: 12px;
  font-weight: ${({ fontWeight }) => fontWeight || `700`};
  background-color: ${({ $bgColor }) => theme.colors[$bgColor]};
  color: ${({ $textColor }) => theme.colors[$textColor]};
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || "100%"};
  margin-top: ${({ $marginTop }) => $marginTop || 0}px;
  &:hover {
    opacity: 0.7;
  }
`;

// 버튼 컴포넌트 정의
const Button = ({
  children,
  type,
  $bgColor,
  $textColor,
  fontSize,
  fontWeight,
  padding,
  $marginTop,
  $maxWidth,
}: //   onClick,
ButtonType) => {
  return (
    <StyledButton
      type={type}
      $bgColor={$bgColor}
      $textColor={$textColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      padding={padding}
      $marginTop={$marginTop}
      $maxWidth={$maxWidth}
      onSubmit={() => console.log("asdds")}
      //   hoverColor={hoverColor}
      //   onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
