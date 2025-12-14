export const defaultBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "https://doctorabad.com/api";

export const isServerSide = typeof window === "undefined";

export const AUTH_COOKIE_KEY = "DALoginStatus";

export const IS_INSTALL_BANNER_SHOW_LOCAL = "WebAppGuideShowed";

export const API_DESTINATION =
  process.env.NODE_ENV === "development"
    ? "http://185.231.180.170/:path*"
    : "https://drabadapp.ir/:path*";

export const IPINFO_API_TOKEN = "abcfe9fb9d14b3";
export const IP_CHECKED_COOKIE = "IPChecked";
export const IP_COUNTRY_COOKIE = "IPCountry";
