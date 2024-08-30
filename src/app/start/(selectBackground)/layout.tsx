import StartLayout from "@components/StartLayout";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <StartLayout progress="first" title="배경을 선택해 주세요">
      {children}
    </StartLayout>
  );
}
