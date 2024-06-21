import theme from "#styles/Theme";
import styled from "styled-components";

type InputType = {
  label?: string;
  type?: "text" | "password" | "email";
  errorLabel?: string;
  placeholder: string;
};

type InputContainerType = {
  $marginTop?: number;
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

const InputContainer = styled.div<InputContainerType>`
  margin-top: ${(props) => (props.$marginTop ? props.$marginTop : 0)}px;
`;

const StyledInput = styled.input<InputType>`
  border: 1px solid ${theme.colors.line01};
  &:focus {
    outline: 1px solid ${theme.colors.main};
  }
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
}: InputType & InputContainerType) {
  return (
    <InputContainer $marginTop={$marginTop}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput placeholder={placeholder} type={type} />
      {errorLabel && <StyledErrorLabel>{errorLabel}</StyledErrorLabel>}
    </InputContainer>
  );
}
