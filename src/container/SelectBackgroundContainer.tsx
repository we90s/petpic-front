import SelectImageWithText from "#components/SelectImageWithText";
import StartLayout from "#components/StartLayout";
import { IMAGE_BASE_URL } from "#utils/baseUrl";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function SelectBackgroundContainer() {
  return (
    <StartLayout progress="first" title="배경을 선택해 주세요">
      <ImageWrapper>
        <Link href="#beach">
          <SelectImageWithText
            src={IMAGE_BASE_URL + "/dog_with_beach.png"}
            altText="dog with beach"
            text="해변"
          />
        </Link>
        <SelectImageWithText
          src={IMAGE_BASE_URL + "/cat_with_grass.png"}
          altText="cat with grass"
          text="꽃밭"
        />
        <SelectImageWithText
          src={IMAGE_BASE_URL + "/cat_with_grass.png"}
          altText="cat with grass"
          text="파리"
        />
      </ImageWrapper>
    </StartLayout>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;
