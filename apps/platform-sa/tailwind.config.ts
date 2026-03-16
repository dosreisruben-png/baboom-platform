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
        brand: {
          orange: "#FF6600",
          "orange-dark": "#CC5200",
          "orange-light": "#FF8533",
          black: "#111111",
          "black-soft": "#1A1A1A",
          "black-muted": "#2C2C2C",
          white: "#FFFFFF",
          gray: {
            50: "#F9F9F9",
            100: "#F0F0F0",
            200: "#E0E0E0",
            400: "#9E9E9E",
            600: "#666666",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "Inter", "system-ui", "sans-serif"],
        condensed: [
          "var(--font-barlow-condensed)",
          "Barlow Condensed",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1", fontWeight: "800" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", fontWeight: "800" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", fontWeight: "700" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-down": "slideDown 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
