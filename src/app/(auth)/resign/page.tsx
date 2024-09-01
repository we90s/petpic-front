import SuccessContainer from "@container/SuccessContainer";

export default function Resign() {
  return (
    <SuccessContainer
      title="탈퇴 처리 되었습니다."
      description="다음에 또 만나요 🥹"
      buttons={[
        {
          href: "/",
          children: "메인 화면으로 가기",
          theme: "white",
          fontSize: "xl",
        },
      ]}
    />
  );
}
