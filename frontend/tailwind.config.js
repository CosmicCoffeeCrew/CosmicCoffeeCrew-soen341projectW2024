/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#87a9cc",
        secondary: {
          100: "#d2b08c",
          200: "#e6ecee",
          300: "#e4cfba"
        },
        dark: "#111111",
        customBrown: "#d2b08c", 
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
