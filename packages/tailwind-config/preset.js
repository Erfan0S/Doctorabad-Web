/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // general.scss already ships a full reboot/reset. Keep it as the global
    // reset during migration so existing (unmigrated) components don't shift.
    preflight: false,
    // .container is a custom class in general.scss (padding: 0 10px) —
    // don't let Tailwind's container clash with it.
    container: false,
  },
  theme: {
    // Bootstrap-style breakpoints — VERIFY against grid.scss (open item)
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    extend: {
      colors: {
        "main-text": "#212529", // $main_text
        red: "#ed3152", // $red
        orange: "#ff6506", // $orange
        green: "#33cc33", // $green
        "green-dark": "#0b690b", // $darkGreen
        "green-base": "#4fcc4c", // $base-green
        "green-pro": "#3b9e97", // $proGreen
        blue: "#2aaadf", // $blue
        "blue-dark": "#006797", // $darkBlue
        purple: "#a167d0", // $purple
        gray: "#949494", // $gray
        "gray-light": "#d1d1d1", // $lightGray / $placeHolderItemsBackGround
        "gray-dark": "#5f5f5f", // $darkGray
        smoke: "#f5f5f5", // $whiteSmoke / $sidebar-bg
        yellow: "#ffcc00", // $yellow
        "header-bg": "#f2f2f2", // $header-bg
        // Per-app theming — resolved by the .base/.market/... classes
        // defined in components.css
        "app-base": "var(--app-base)",
        "button-bg": "var(--button-bg)",
      },
      boxShadow: {
        card: "0 0 6px rgba(0, 0, 0, 0.4)", // $card-box-shadow
        "card-hover":
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      },
      spacing: {
        "sidebar-collapsed": "150px", // $sidebar-collapse-width
        "sidebar-expanded": "230px", // $sidebar-expand-width
        "header-spacing": "160px", // $header-with-spacing-height
      },
      keyframes: {
        // renamed from `pulse` to avoid clashing with Tailwind's built-in pulse
        "pulse-grow": {
          "0%, 100%": { color: "#ddd", transform: "scale(1)" },
          "50%": { color: "#33cc33", transform: "scale(1.2)" },
        },
      },
      animation: {
        "pulse-grow": "pulse-grow 2s ease-in-out infinite",
        // `spinner` keyframe → use Tailwind's built-in `animate-spin`
      },
    },
  },
};
