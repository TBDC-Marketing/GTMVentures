/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1628",
          light: "#111D2E",
          mid: "#162236",
        },
        teal: {
          DEFAULT: "#00838F",
          light: "#00A3A3",
        },
        gold: {
          DEFAULT: "#D4A843",
          muted: "#B8943B",
        },
        charcoal: "#1E293B",
        surface: "#FAFAF7",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
