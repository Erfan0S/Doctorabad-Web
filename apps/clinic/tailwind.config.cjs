const preset = require("@repo/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    // ponytail: assets/** + pagesComponents/** included from day one - learn's purge-bug lesson
    "./assets/**/*.{ts,tsx}",
    "./pagesComponents/**/*.{ts,tsx}",
    "../../packages/shared_modules/**/*.{ts,tsx}",
    "../../packages/apps_shared_components/**/*.{ts,tsx}",
    "../../packages/core/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "clinic-slide-down": {
          from: { opacity: "0", transform: "translateY(-5px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "clinic-slide-down": "clinic-slide-down 0.3s ease",
      },
    },
  },
};
