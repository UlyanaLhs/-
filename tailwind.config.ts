import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0D0D0C",
          deep: "#080807",
          light: "#141412",
        },
        charcoal: {
          DEFAULT: "#181716",
          elevated: "#211F1D",
          subtle: "#2A2825",
        },
        bronze: {
          DEFAULT: "#C5A880",
          light: "#DFCCA8",
          dark: "#9C7E55",
          muted: "#826B4E",
        },
        ivory: {
          DEFAULT: "#F4F0EA",
          muted: "#D8D2C6",
          dark: "#A69F92",
        },
        stone: {
          DEFAULT: "#8C867E",
          subtle: "#54504A",
          hairline: "rgba(244, 240, 234, 0.08)",
          hairlineLight: "rgba(244, 240, 234, 0.15)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "inner-highlight": "inset 0 1px 1px 0 rgba(244, 240, 234, 0.12)",
        "double-bezel": "0 0 0 1px rgba(244, 240, 234, 0.07), 0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        "glow-bronze": "0 0 30px -5px rgba(197, 168, 128, 0.2)",
      },
      letterSpacing: {
        ultrawide: "0.25em",
        editorial: "0.08em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
