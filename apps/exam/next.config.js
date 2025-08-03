import initPwa from "next-pwa";
// import { API_DESTINATION } from "@repo/core/constants/constants";

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
  basePath: "/exam",
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
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://185.231.180.170/:path*",
        basePath: false,
      },
      {
        source: "/mag/:path*",
        destination: `https://mag.doctorabad.com/:path*`,
      },
    ];
  },
});
