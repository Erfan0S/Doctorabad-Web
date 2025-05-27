export const routePath = {
  drAbadBaseUrl: "https://develop.doctorabad.com/",
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
};

// export const baseUrls = {
//   base: "http://localhost:3001",
//   learn: "http://localhost:3003" + routePath.learnBasePath,
//   market: "http://localhost:3002" + routePath.marketBasePath,
// };


export const baseUrls = {
  base: "https://develop.doctorabad.com/",
  learn: "https://develop.doctorabad.com/" + routePath.learnBasePath,
  market: "https://develop.doctorabad.com/" + routePath.marketBasePath,
};
