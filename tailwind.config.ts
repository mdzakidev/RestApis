import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      container: {
        padding: "0 2rem",
        center: true
      },
      colors: {
        default: "222830",
        primary: {
          50: "#fff1f1",
          100: "#ffe1e1",
          200: "#ffc7c7",
          300: "#ffa0a0",
          400: "#ff6363",
          500: "#f83b3b",
          600: "#e51d1d",
          700: "#c11414",
          800: "#a01414",
          900: "#841818",
          950: "#480707"
        },
        secondary: {
          50: "#f2f2f2",
          100: "#e6e6e6",
          200: "#bfbfbf",
          300: "#999999",
          400: "#4d4d4d",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        }
      }
    }
  },
  plugins: [],
};
export default config;
