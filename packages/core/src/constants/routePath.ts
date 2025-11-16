import { Apps } from "../types/general";

export const routePath = {
  drAbadBaseUrl: "https://develop.doctorabad.com",
  home: "/",
  marketBasePath: "/market",
  register: "/register",
  checkout: "/checkout",
  callback: "/callback",
  archive: "/product-list/archive",
  searchList: "/product-list/search",
  newestProducts: "/product-list/newest",
  amazingProducts: "/product-list/amazing",
  suggestedProducts: "/product-list/suggested",
  bestsellingProducts: "/product-list/bestselling",
  learnBasePath: "/learn",
  appDownload: "/app",
  examBasePath: "/exam",
};

export const learnPaths = {
  provider: "/providers",
  single: "/course",
};

export const marketPaths = {
  single: "/product",
};

export const examPaths = {
  single: "/single",
};

export const productionBaseUrl = "https://develop.doctorabad.com";

// export const baseUrls = {
//   [Apps.BASE]:
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3001"
//       : productionBaseUrl,
//   [Apps.LEARN]:
//     (process.env.NODE_ENV === "development"
//       ? "http://localhost:3003"
//       : productionBaseUrl) + routePath.learnBasePath,
//   [Apps.MARKET]:
//     (process.env.NODE_ENV === "development"
//       ? "http://localhost:3002"
//       : productionBaseUrl) + routePath.marketBasePath,
//   [Apps.EXAM]:
//     (process.env.NODE_ENV === "development"
//       ? "http://localhost:3004"
//       : productionBaseUrl) + routePath.examBasePath,
// };

export const baseUrls = {
  [Apps.BASE]: "https://develop.doctorabad.com",
  [Apps.LEARN]: "https://develop.doctorabad.com" + routePath.learnBasePath,
  [Apps.MARKET]: "https://develop.doctorabad.com" + routePath.marketBasePath,
  [Apps.EXAM]: "https://develop.doctorabad.com" + routePath.examBasePath,
};
