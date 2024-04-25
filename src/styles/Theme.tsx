const colors = {
  main: "#3A49E6",
  pink: "#FF5E5D",
  bg01: "#98979F",
  bg02: "#D9D9D9",
  bg03: "#F8F8FA",
  text01: "#191919",
  text02: "#2E3338",
  text03: "#717176",
  line01: "#DBDBDB",
  white: "#ffffff",
  black: "#000000",
  red: "#E42F1E",
  green: "#2BC45C",
};

const fontSize = {
  h1: "3.6rem",
  h2: "2.3rem",
  xs: "0.75rem",
  sm: "1.3rem",
  md: "1.4rem",
  lg: "1.6rem",
  xl: "1.8rem",
  "2xl": "2.3rem",
};

const theme = {
  colors,
  fontSize,
};

export default theme;

export type ThemeType = typeof theme;
