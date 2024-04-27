import theme from "#styles/Theme";
import React from "react";
import styled from "styled-components";

type InputType = {
  label?: string;
  $marginTop?: number;
  type?: "text" | "password" | "email";
  errorLabel?: string;
  placeholder: string;
};

const StyledLabel = styled.label`
  color: ${theme.colors.text03};
  font-size: ${theme.fontSize.md};
  font-weight: 700;
  line-height: 2.1rem;
  display: block;
  margin-bottom: 8px;
`;

const StyledErrorLabel = styled.label`
  color: ${theme.colors.red};
  font-size: ${theme.fontSize.sm};
  margin-left: 20px;
  margin-top: 4px;
  line-height: 1.95rem;
  display: inline-block;
`;

const StyledInput = styled.input<InputType>`
  border: 1px solid ${theme.colors.line01};
  &:focus {
    outline: 1px solid ${theme.colors.main};
  }
  margin-top: ${(props) => (props.$marginTop ? props.$marginTop : 0)}px;
  padding: 12px 20px;
  font-size: ${theme.fontSize.lg};
  border-radius: 8px;
  color: ${theme.colors.text01};
  width: 100%;
  box-sizing: border-box;
  &::placeholder {
    color: ${theme.colors.bg01};
  }
`;

export default function Input({
  label,
  type = "text",
  $marginTop,
  errorLabel,
  placeholder,
}: InputType) {
  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput
        placeholder={placeholder}
        type={type}
        $marginTop={$marginTop}
      />
      {errorLabel && <StyledErrorLabel>{errorLabel}</StyledErrorLabel>}
    </>
  );
}
