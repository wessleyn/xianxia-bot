/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update content to include all component files
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./index.js",
    "./App.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

