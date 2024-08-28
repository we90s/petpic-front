import StartLayout from "@components/StartLayout";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <StartLayout progress="third" title="완성된 사진은 메일로 보내드려요">
      {children}
    </StartLayout>
  );
}
