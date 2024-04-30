import SignUpContainer from "container/SignUpContainer";
import SuccessContainer from "container/SuccessContainer";

export default function signUp() {
  return (
    <>
      {/* <SignUpContainer /> */}
      <SuccessContainer
        title="가입이 완료되었습니다"
        description="반가워요. 댕냥이를 위한 사진을 만들어 보세요."
        buttons={[
          {
            children: "무료로 사진 만들기",
            $bgColor: "white",
            $textColor: "text01",
            fontSize: "xl",
            $marginTop: 60,
            $maxWidth: "320px",
          },
        ]}
      />
    </>
  );
}
