import initPwa from "next-pwa";
import { API_DESTINATION } from "@repo/core/constants/constants";

const withPWA = initPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
export default withPWA({
  reactStrictMode: true,
  transpilePackages: ["@repo/core", "@repo/shared_modules"],
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  basePath: "/download",
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
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
  },

  sassOptions: {
    quietDeps: true,
  },
  async redirects() {
    return [
      {
        source: "/dd/pb/:id+",

        destination: "/download/publishers/:id+",
        permanent: true,
        basePath: false,
      },
      {
        source: "/dd/cp/:path*",
        destination: "/download/collections/:path*",
        permanent: true,
        basePath: false,
      },
      {
        source: "/dd/:id+",

        destination: "/download/package/:id+",
        permanent: true,
        basePath: false,
      },
    ];
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
