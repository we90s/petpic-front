import { ImgSrcProvider } from "app/provider";

export default function layout({ children }: { children: React.ReactNode }) {
  return <ImgSrcProvider>{children}</ImgSrcProvider>;
}
