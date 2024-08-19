import SelectImageWithText from "#components/SelectImageWithText";
import StartLayout from "#components/StartLayout";
import { IMAGE_BASE_URL } from "#utils/baseUrl";
import Link from "next/link";
import React from "react";

export default function SelectBackgroundContainer() {
  return (
    <StartLayout progress="first" title="배경을 선택해 주세요">
      <div>
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
      </div>
    </StartLayout>
  );
}
