import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/consts/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",

      text: "#4C4E64",
      accent: "#0084FF",
      bg: "#F7F7F9",
      border: "#EBEBED",
      input: "#F0F0F0",
      card: "#EAEAEC",
      cell: "#F2F2F2",
      success: "",
      error: "#E40000",
      warning: "#E40000",
    },
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
        radius: {
          small: "6px", // rounded-small
          medium: "8px", // rounded-medium
          large: "12px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
      },
      themes: {
        light: {
          colors: {
            background: "#F7F7F9",
            foreground: "#2C2C2C",
            primary: {
              DEFAULT: "#0084FF",
              foreground: "#FFFFFF",
            },
            danger: "#FF5353",
          },
        },
      },
    }),
  ],
};
export default config;
