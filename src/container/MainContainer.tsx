import Textbox from "#components/Textbox";
import styled from "styled-components";
import Image from "next/image";
import firstPic from "#assets/main-first.png";
import secondPic from "#assets/main-second.png";
import Button from "#components/Button";
import theme from "#styles/Theme";
export default function MainContainer() {
  return (
    <Container>
      <Title>댕냥이를 위한 방구석 스튜디오</Title>
      <PictureWrapper>
        <FirstPicWrapper>
          <Textbox content="여러분 우리 댕냥이 좀 보세요" />
          <Image
            src={firstPic}
            width={280}
            height={280}
            alt="Picture of dog with flower "
          />
        </FirstPicWrapper>
        <ArrowBox />
        <SecondPicWrapper>
          <HeartBox isSmall />
          <HeartBox />
          <Textbox content="#강아지" />
          <Textbox content="#해변" />
          <Image
            src={secondPic}
            width={280}
            height={280}
            alt="Picture of dog in beach"
          />
        </SecondPicWrapper>
      </PictureWrapper>
      <Button bgColor="main" textColor="white" fontSize="xl">
        시작하기
      </Button>
    </Container>
  );
}

const Container = styled.div`
  width: fit-content;
  margin-top: 56px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.h1};
  font-weight: 700;
  text-align: center;
`;

const PictureWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 763px) {
    flex-direction: column;
  }
  gap: 20px;
  margin-top: 42px;
  margin-bottom: 40px;
`;

const FirstPicWrapper = styled.div`
  position: relative;
  & div {
    position: absolute;
    @media (min-width: 403px) {
      top: 24px;
      left: -183px;
    }
    top: -20px;
  }
`;

const SecondPicWrapper = styled.div`
  position: relative;
  & div {
    position: absolute;
  }

  & div:first-child {
    top: -30px;
    @media (min-width: 403px) {
      right: -45px;
    }
    right: 10px;
  }

  & div:nth-child(2) {
    top: 30px;
    @media (min-width: 403px) {
      right: -28px;
    }
    right: 18px;
  }

  & div:nth-child(3) {
    top: 127px;
    @media (min-width: 403px) {
      right: -24px;
    }
    right: 0px;
  }

  & div:nth-child(4) {
    top: 194px;
    @media (min-width: 403px) {
      right: -62px;
    }
    right: 0px;
  }
`;

const HeartBox = styled.div<{ isSmall?: boolean }>`
  width: ${({ isSmall }) => (isSmall ? `20px` : `30px`)};
  height: ${({ isSmall }) => (isSmall ? `20px` : `30px`)};
  background: #ff5e5d;
  position: relative;
  border-bottom-right-radius: 3px;
  transform: ${({ isSmall }) => (isSmall ? `rotate(36deg)` : `rotate(63deg)`)};
  &::before,
  &::after {
    content: "";
    width: ${({ isSmall }) => (isSmall ? `20px` : `30px`)};
    height: ${({ isSmall }) => (isSmall ? `20px` : `30px`)};
    position: absolute;
    border-radius: 50%;
    background: #ff5e5d;
  }
  &::before {
    left: -50%;
  }
  &::after {
    top: -50%;
  }
`;

const ArrowBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #b0b0b0;
  position: relative;
  font-size: ${theme.fontSize.lg};
  &::before,
  &::after {
    content: "";
    background: white;
    -webkit-border-radius: 2em;
    border-radius: 2em;
    height: 0.17em;
    position: absolute;
    left: 1em;
    width: 0.7em;
  }

  &::before {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 1em;
  }

  &::after {
    bottom: 0.95em;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  @media (max-width: 763px) {
    transform: rotate(90deg);
  }
`;
