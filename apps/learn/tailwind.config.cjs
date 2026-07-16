const preset = require("@repo/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./assets/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/shared_modules/**/*.{ts,tsx}",
    "../../packages/apps_shared_components/**/*.{ts,tsx}",
    "../../packages/core/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "scan-pulse": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.95)" },
        },
      },
      animation: {
        "scan-pulse": "scan-pulse 0.5s infinite alternate",
      },
    },
  },
};
