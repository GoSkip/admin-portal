/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const forms = require("@tailwindcss/forms");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      sky: colors.lightBlue,
      stone: colors.warmGray,
      neutral: colors.trueGray,
      slate: colors.blueGray,
      coolGray: {
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
      success: colors.emerald[500],
      error: colors.red[500],
      primary: colors.lightBlue[500],
      warning: colors.amber[500],
    },
  },
  plugins: [forms],
};
