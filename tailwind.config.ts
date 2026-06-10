import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "ui-serif", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        cream: {
          50: "#FDFCFB",
          100: "#FAF8F5",
          200: "#F2EDE7",
          300: "#E8E2DA",
        },
        gold: {
          50: "#FBF5E8",
          100: "#F3E6C4",
          200: "#E5CA8A",
          300: "#D4AF6A",
          400: "#C49A4E",
          500: "#B8963E",
          600: "#9A7C30",
          700: "#7A6124",
        },
        charcoal: {
          50: "#F4F3F1",
          100: "#E6E4E0",
          200: "#C8C3BC",
          300: "#9B9590",
          400: "#6B6560",
          500: "#4A4845",
          600: "#2C2B29",
          700: "#1E1D1B",
          800: "#1A1918",
          900: "#141312",
        },
        stone: {
          50: "#F9F7F5",
          100: "#EDE9E4",
          200: "#D8D1C9",
          300: "#BFB6AD",
          400: "#A8A09A",
          500: "#7A7570",
          600: "#625D58",
          700: "#4A4641",
        },
      },
      letterSpacing: {
        widest: "0.2em",
        "ultra-wide": "0.3em",
      },
      lineHeight: {
        relaxed: "1.75",
        loose: "2",
      },
    },
  },
  plugins: [],
};

export default config;
