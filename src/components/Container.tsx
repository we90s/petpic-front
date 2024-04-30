import React, { ReactElement } from "react";
import styled from "styled-components";

type Props = {
  children: ReactElement | ReactElement[];
  $marginTop?: number;
  $maxWidth?: number;
  $textAlign?: "left" | "right" | "center";
};

export default function Container({
  children,
  $marginTop,
  $maxWidth,
  $textAlign,
}: Props) {
  return (
    <ContainerBox
      $marginTop={$marginTop}
      $maxWidth={$maxWidth}
      $textAlign={$textAlign}
    >
      {children}
    </ContainerBox>
  );
}

const ContainerBox = styled.div<Props>`
  margin-top: ${({ $marginTop }) => $marginTop || 56}px;
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ $maxWidth }) => $maxWidth || 540}px;
  text-align: ${({ $textAlign }) => $textAlign || "left"};
`;
