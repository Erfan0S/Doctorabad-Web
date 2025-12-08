export const defaultBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3007/api"
    : "https://doctorabad.com/api";

export const isServerSide = typeof window === "undefined";

export const AUTH_COOKIE_KEY = "DALoginStatus";

export const IS_INSTALL_BANNER_SHOW_LOCAL = "WebAppGuideShowed";

export const API_DESTINATION =
  process.env.NODE_ENV === "development"
    ? "http://185.231.180.170/:path*"
    : "https://drabadapp.ir/:path*";
