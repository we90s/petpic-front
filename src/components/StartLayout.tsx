import React, { ReactElement } from "react";
import Container from "./Container";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";
import theme from "#styles/Theme";

type Props = {
  children: ReactElement;
  title: string;
  progress: "first" | "second" | "third";
};

export default function StartLayout({ children, progress, title }: Props) {
  return (
    <Container $textAlign="center" $marginTop={60}>
      <ProgressBar progress={progress} />
      <Title>{title}</Title>
      {children}
    </Container>
  );
}

const Title = styled.h1`
  font-size: ${theme.fontSize.h1};
  margin: 28px 0px 44px 0px;
  font-weight: 700;
`;
