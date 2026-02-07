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
  pharmacyBasePath: "/pharmacy",
  clinicBasePath: "/clinic",
  toolsBasePath: "/tools",
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
export const pharmacyPaths = {
  single: "/medicine",
};
export const clinicPaths = {
  single: "/disease",
};


export const productionBaseUrl = "https://doctorabad.com";


export const baseUrls = {
  [Apps.BASE]:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : productionBaseUrl,
  [Apps.LEARN]:
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3003"
      : productionBaseUrl) + routePath.learnBasePath,
  [Apps.MARKET]:
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      : productionBaseUrl) + routePath.marketBasePath,
  [Apps.EXAM]:
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3004"
      : productionBaseUrl) + routePath.examBasePath,
};

// export const baseUrls = {
//   [Apps.BASE]: "https://doctorabad.com",
//   [Apps.LEARN]: "https://doctorabad.com" + routePath.learnBasePath,
//   [Apps.MARKET]: "https://doctorabad.com" + routePath.marketBasePath,
//   [Apps.EXAM]: "https://doctorabad.com" + routePath.examBasePath,
// };
