import theme from "#styles/Theme";
import React from "react";

type Props = {
  progress: "first" | "second" | "third";
};

export default function ProgressBar({ progress }: Props) {
  return (
    <svg
      width="290"
      height="22"
      viewBox="0 0 290 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="12"
        y1="11"
        x2="278"
        y2="11"
        stroke="#DBDBDB"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="6 6"
      />
      <circle
        cx="11"
        cy="11"
        r="8.5"
        fill="white"
        stroke={
          progress === "first" || progress === "second" || progress === "third"
            ? theme.colors.main
            : theme.colors.line01
        }
        stroke-width="5"
      />
      <circle
        cx="146"
        cy="11"
        r="8.5"
        fill="white"
        stroke={
          progress === "second" || progress === "third"
            ? theme.colors.main
            : theme.colors.line01
        }
        stroke-width="5"
      />
      <circle
        cx="279"
        cy="11"
        r="8.5"
        fill="white"
        stroke={progress === "third" ? theme.colors.main : theme.colors.line01}
        stroke-width="5"
      />
    </svg>
  );
}
