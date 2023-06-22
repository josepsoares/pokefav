/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "main-yellow": "#ffe066",
        "main-red": "#f24643",
        "main-blue": "#1688b9",
        "main-white": "#f8f8e6",
        "main-white-secondary": "#cacabf",
      },
      fontFamily: {
        heading: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
};

