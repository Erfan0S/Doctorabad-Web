export const defaultBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3009/api"
    : "https://develop.doctorabad.com/api";

export const isServerSide = typeof window === "undefined";

export const AUTH_COOKIE_KEY = "DALoginStatus";

export const IS_INSTALL_BANNER_SHOW_LOCAL = "WebAppGuideShowed";

export const API_DESTINATION =
  process.env.NODE_ENV === "development"
    ? "https://drabadapp.ir/:path*"
    : "http://185.231.180.170/:path*";

export const IPINFO_API_TOKEN = "abcfe9fb9d14b3";
export const IP_CHECKED_COOKIE = "IPChecked";
export const IP_COUNTRY_COOKIE = "IPCountry";

export const VIEWPORT_HEADER = "x-viewport";
