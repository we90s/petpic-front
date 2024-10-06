import { Metadata } from "next";
import "@styles/global.css";
import Container from "@components/Container";
import Header from "@components/Header";
import { checkAuthStatus } from "@lib/auth";
import dynamic from "next/dynamic";

const ClientToast = dynamic(() => import("@components/ClientToast"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "댕냥이를 위한 방구석 스튜디오",
  description: "우리집 댕냥이 사진으로 컨셉 사진을 만들어보아요!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = await checkAuthStatus();
  return (
    <html lang="en">
      <head></head>
      <body>
        <ClientToast />
        <Header authData={authData} />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
