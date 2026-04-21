/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F0EBE1",
          dark: "#E8E2D6",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#2D2D2D",
          muted: "#6B6B6B",
        },
        navy: {
          DEFAULT: "#0A1628",
          soft: "#1A2438",
        },
        teal: {
          DEFAULT: "#00838F",
        },
        gold: {
          DEFAULT: "#D4A843",
          deep: "#B8943B",
        },
        "warm-accent": "#C84D2E",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
