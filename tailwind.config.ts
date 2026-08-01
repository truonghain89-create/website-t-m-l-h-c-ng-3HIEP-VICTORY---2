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
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: "var(--text-display)",
        h1: "var(--text-h1)",
        h2: "var(--text-h2)",
        h3: "var(--text-h3)",
        h4: "var(--text-h4)",
        "body-lg": "var(--text-body-lg)",
        body: "var(--text-body)",
        small: "var(--text-small)",
        caption: "var(--text-caption)",
        label: "var(--text-label)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "var(--shadow-glow)",
        "glow-sm": "var(--shadow-glow-sm)",
        premium: "var(--shadow-md)",
        "premium-dark": "var(--shadow-lg)",
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
