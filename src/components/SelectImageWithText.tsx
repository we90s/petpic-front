import theme from "#styles/Theme";
import Image from "next/image";
import styled from "styled-components";

type Props = {
  src: string;
  altText: string;
  text: string;
};

export default function SelectImageWithText({ src, altText, text }: Props) {
  return (
    <SelectImageWithTextBox>
      <Image src={src} width={218} height={218} alt={altText} priority />
      <TextBox>{text}</TextBox>
    </SelectImageWithTextBox>
  );
}

const TextBox = styled.div`
  border: 1px solid ${theme.colors.line01};
  border-top: none;
  border-radius: 0px 0px 12px 12px;
  height: 72px;
  color: ${theme.colors.text03};
  font-size: ${theme.fontSize["2xl"]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

const SelectImageWithTextBox = styled.div`
  width: 218px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid ${theme.colors.main};
    border-radius: 22px 22px 14px 14px;
  }
`;
