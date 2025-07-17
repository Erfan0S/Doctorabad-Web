export const defaultBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "https://develop.doctorabad.com/api";
// process.env.NODE_ENV === "development"
//   ? "http://localhost:3001/api"
//   : "http://localhost:3001/api";

export const isServerSide = typeof window === "undefined";

export const AUTH_COOKIE_KEY = "DALoginStatus";

export const IS_INSTALL_BANNER_SHOW_LOCAL = "WebAppGuideShowed";
