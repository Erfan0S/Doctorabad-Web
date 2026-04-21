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
  basePath: "/download",
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
  //   async redirects() {
  //   return [
  //     {
  //       source: "/mc/:id*", 

  //       destination: "/clinic/:id*", 
  //       permanent: true, 
  //       basePath: false, 
  //     },
  //   ];
  // },
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
