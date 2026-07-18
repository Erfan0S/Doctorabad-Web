const preset = require("@repo/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./assets/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pagesComponents/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
    "../../packages/shared_modules/**/*.{ts,tsx}",
    "../../packages/apps_shared_components/**/*.{ts,tsx}",
    "../../packages/core/**/*.{ts,tsx}",
  ],
};
