import theme from "#styles/Theme";
import styled from "styled-components";

type Props = {
  content: string;
};

export default function Textbox({ content }: Props) {
  return <Container>{content}</Container>;
}

const Container = styled.div`
  border-radius: 100px;
  background-color: white;
  box-shadow: 0px 0px 4px 0px #00000040;
  width: fit-content;
  padding: 1.6rem 1.6rem 1.4rem 1.6rem;
  color: #2e3338;
  font-weight: 700;
  line-height: 30px;
  @media (min-width: 403px) {
    font-size: ${theme.fontSize["2xl"]};
  }
  font-size: ${theme.fontSize["xl"]};
`;
