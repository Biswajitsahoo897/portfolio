import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E14",
        surface: "#10141D",
        surface2: "#161B26",
        line: "#232A38",
        fog: "#8A93A6",
        paper: "#E9EDF3",
        signal: "#5FE1C9",
        warn: "#F2A65A",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { strokeDashoffset: "0" },
          "50%": { strokeDashoffset: "20" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        pulseLine: "pulseLine 3.5s linear infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
