import initPwa from "next-pwa";
import {
  API_DESTINATION,
  defaultBaseUrl,
} from "@repo/core/constants/constants";

const withPWA = initPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const defaultRedirects = [
  {
    source: "/dm/ch/:id(\\d+)",
      destination: "/product-list/archive?provider=:id",
      permanent: true,
  },
  {
    source: "/dm/:id(\\d+)",
      destination: "/product/:id",
      permanent: true,
  },
];

const buildCollectionSearchText = (title) => {
  return title
    .replace(/^مجموعه\s*کتاب[‌\s-]*های?\s*/u, "")
    .replace(/\s*پزشکی\s*$/u, "")
    .trim();
};

const getCollectionRedirects = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch(`https://drabadapp.ir/user/shop/collection`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch collections: ${response.status}`);
    }

    const result = await response.json();
    const collections = result?.data || [];

    console.log("collections fetched:", collections.length);

    const redirects = collections
      .filter((collection) => collection?.id && collection?.title)
      .map((collection) => {
        const searchText =
          buildCollectionSearchText(collection.title) ||
          collection.title.trim();

        const redirect = {
          source: `/dm/cl/${collection.id}`,
          destination: `/product-list/search?search=${encodeURIComponent(
            searchText
          )}`,
          permanent: false,
        };

        console.log("redirect built:", redirect);
        return redirect;
      });

    return redirects;
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn("Collection redirects fetch timed out, skipping...");
    } else {
      console.error("Failed to build collection redirects", error);
    }
    return [];
  }
};
/** @type {import('next').NextConfig} */
export default withPWA({
  reactStrictMode: true,
  transpilePackages: ["@repo/core", "@repo/shared_modules"],
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  basePath: "/market",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
    domains: ["doctoabad.com", "drabadapp.ir", "arvanstorage.ir"],
  },
  sassOptions: {
    quietDeps: true,
  },
  async redirects() {
    const collectionRedirects = await getCollectionRedirects();

    return [...defaultRedirects, ...collectionRedirects];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: API_DESTINATION,
        basePath: false,
      },
      {
        source: "/mag/:path*",
        destination: `https://mag.doctorabad.com/:path*`,
      },
    ];
  },
});
