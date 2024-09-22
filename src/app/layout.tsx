import { Metadata } from "next";
import "@styles/global.css";
import Container from "@components/Container";
import Header from "@components/Header";
import AuthProvider from "./provider";
import { checkAuthStatus } from "@lib/auth";
import { PublicEnvScript } from "next-runtime-env";

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
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <AuthProvider initialEmail={authData.email}>
          <Header authData={authData} />
          <Container>{children}</Container>
        </AuthProvider>
      </body>
    </html>
  );
}
