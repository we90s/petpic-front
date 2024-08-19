"use client";

import SelectBackgroundContainer from "#container/SelectBackgroundContainer";
import UploadImageContainer from "#container/UploadImageContainer";
import React from "react";

export default function background() {
  return (
    <>
      <section id="">{/* <SelectBackgroundContainer /> */}</section>
      <section id="beach">
        <UploadImageContainer />
      </section>
    </>
  );
}
