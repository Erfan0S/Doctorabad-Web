export const defaultBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3006/api"
    : "https://dev.doctorabad.com/api";
// "http://192.168.1.2:3001/api"
export const isServerSide = typeof window === "undefined";

export const AUTH_COOKIE_KEY = "DALoginStatus";

export const IS_INSTALL_BANNER_SHOW_LOCAL = "WebAppGuideShowed";

// export const API_DESTINATION =
//   process.env.NODE_ENV === "development"
//     ? "http://185.231.180.170/:path*"
//     : "https://drabadapp.ir/:path*";

export const API_DESTINATION = "http://185.231.180.170/:path*";

export const IPINFO_API_TOKEN = "abcfe9fb9d14b3";
export const IP_CHECKED_COOKIE = "IPChecked";
export const IP_COUNTRY_COOKIE = "IPCountry";

export const VIEWPORT_HEADER = "x-viewport";

export const IS_PERVENT_GOOGLE_INDEX = true;
