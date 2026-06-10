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
        serif: ["var(--font-cormorant)", "Georgia", "ui-serif", "serif"],
        sub: ["var(--font-arsenal)", "ui-sans-serif", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "ui-sans-serif", "sans-serif"],
        script: ["var(--font-hello-january)", "cursive"],
      },
      colors: {
        zenith: {
          charcoal: "#262522",
          forest: "#5d5d31",
          olive: "#7c7b42",
          cream: "#e3ddd4",
          sand: "#9c8260",
          bronze: "#86602f",
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
