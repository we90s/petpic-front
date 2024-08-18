"use client";

import SuccessContainer from "#container/SuccessContainer";

export default function signUp() {
  return (
    <SuccessContainer
      title="가입이 완료되었습니다"
      description="반가워요. 댕냥이를 위한 사진을 만들어 보세요."
      buttons={[
        {
          href: "/start",
          children: "무료로 사진 만들기",
          theme: "white",
          fontSize: "xl",
          onClick: () => console.log("asd"),
        },
      ]}
    />
  );
}
