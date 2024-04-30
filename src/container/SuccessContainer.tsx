import Button, { ButtonType } from "#components/Button";
import Container from "#components/Container";
import theme from "#styles/Theme";
import styled from "styled-components";

type Props = {
  title: string;
  description: string;
  buttons: ButtonType[];
};

export default function SuccessContainer({
  title,
  description,
  buttons,
}: Props) {
  return (
    <Container $marginTop={102} $textAlign="center">
      <SuccessIcon />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ButtonWrapper>
        {buttons.map((button) => {
          return <Button {...button} />;
        })}
      </ButtonWrapper>
    </Container>
  );
}

const SuccessIcon = styled.div`
  width: 164px;
  height: 164px;
  border-radius: 100%;
  background-color: ${theme.colors.green};
  margin: 0 auto;
  position: relative;

  &:before,
  &::after {
    content: "";
    position: absolute;
    background-color: ${theme.colors.white};
  }

  &::before {
    width: 72px;
    height: 13.5px;
    border-top-right-radius: 99px;
    border-bottom-right-radius: 99px;
    top: 47%;
    right: 22%;
    transform: rotate(-45deg);
    border-bottom-left-radius: 99px;
  }

  &::after {
    width: 38px;
    height: 13.5px;
    border-top-left-radius: 99px;
    border-bottom-left-radius: 99px;
    top: 50%;
    left: 22.4%;
    transform: rotate(45deg);
  }
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.h1};
  font-weight: 700;
  line-height: 5rem;
  margin: 36px 0px 12px 0px;
`;

const Description = styled.p`
  color: ${theme.colors.text02};
  font-size: ${theme.fontSize.lg};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;
