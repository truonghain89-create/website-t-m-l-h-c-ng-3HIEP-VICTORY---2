import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        highlight: "rgb(var(--highlight) / <alpha-value>)",
        
        background: "rgb(var(--background) / <alpha-value>)",
        "background-secondary": "rgb(var(--background-secondary) / <alpha-value>)",
        "background-section": "rgb(var(--background-section) / <alpha-value>)",
        "background-alt": "rgb(var(--background-alt) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        "foreground-secondary": "rgb(var(--foreground-secondary) / <alpha-value>)",
        
        border: "rgb(var(--border) / <alpha-value>)",
        divider: "rgb(var(--divider) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        subheading: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 35px rgba(15, 23, 42, 0.06)",
        "premium-dark": "0 10px 35px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
