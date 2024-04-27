import theme from "#styles/Theme";
import { COLORS_TYPE, colors } from "colors";
import React from "react";
import styled from "styled-components";

// 재사용 가능한 버튼 스타일 정의

type ButtonType = {
  children: string;
  fontSize: "md" | "xl";
  $bgColor: "main" | "white" | "bg01" | "line01";
  $textColor: "text03" | "white";
  fontWeight?: "500";
  padding?: string;
  type?: "submit";
};

const StyledButton = styled.button<ButtonType>`
  padding: ${({ padding }) => padding || "20px"};
  font-size: ${({ fontSize }) => theme.fontSize[fontSize]};
  border: none;
  border-radius: 12px;
  font-weight: ${({ fontWeight }) => fontWeight || `700`};
  background-color: ${({ $bgColor }) => theme.colors[$bgColor]};
  color: ${({ $textColor }) => theme.colors[$textColor]};
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

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
      onSubmit={() => console.log("asdds")}
      //   hoverColor={hoverColor}
      //   onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
