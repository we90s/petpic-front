import { Metadata } from "next";
import "#styles/global.css";
import Container from "#components/Container";
import Header from "#components/Header";

export const metadata: Metadata = {
  title: "댕냥이를 위한 방구석 스튜디오",
  description: "우리집 댕냥이 사진으로 컨셉 사진을 만들어보아요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
