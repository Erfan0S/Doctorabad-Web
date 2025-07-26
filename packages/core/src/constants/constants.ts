export const defaultBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002/api"
    : "http://localhost:3002/api";
// : "https://develop.doctorabad.com/api";

export const isServerSide = typeof window === "undefined";

export const AUTH_COOKIE_KEY = "DALoginStatus";

export const IS_INSTALL_BANNER_SHOW_LOCAL = "WebAppGuideShowed";

// export const API_DESTINATION = "https://drabadapp.ir/:path*";
export const API_DESTINATION = "http://185.231.180.170/:path*";
