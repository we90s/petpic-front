import Main from "#pages/index";
import Theme from "#styles/Theme";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  & html {
    font-size : 62.5%;
  }
 
`;

export default function MyApp() {
  return (
    <>
      <GlobalStyle />
      <Main />
    </>
  );
}
