import SuccessContainer, { ButtonLinkType } from "@container/SuccessContainer";
import GoogleIcon from "@assets/btn_google.svg";
import NaverIcon from "@assets/btn_naver.svg";
import DaumIcon from "@assets/btn_daum.svg";
export default function page() {
  const buttons: ButtonLinkType[] = [
    {
      href: "https://mail.google.com/",
      children: (
        <>
          <GoogleIcon />
          구글
        </>
      ),
      theme: "white",
      fontSize: "md",
    },
    {
      href: "https://mail.naver.com",
      children: (
        <>
          <NaverIcon />
          네이버
        </>
      ),
      theme: "white",
      fontSize: "md",
    },
    {
      href: "https://mail.daum.net",
      children: (
        <>
          <DaumIcon />
          다음
        </>
      ),
      theme: "white",
      fontSize: "md",
    },
  ];
  return (
    <SuccessContainer
      newTap
      title="메일에서 완성된 사진 확인하기"
      description={
        <>
          이용자 수에 따라 메일 전송까지 <span>1~10분의 시간이 소요</span>될 수
          있어요
        </>
      }
      buttons={buttons}
    />
  );
}
