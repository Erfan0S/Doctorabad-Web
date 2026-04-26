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
  basePath: "/learn",
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
        source: "/dl/ch/:id+", 

        destination: "/learn/providers/:id+", 
        permanent: true, 
        basePath: false, 
      },
      {
        source: "/dl/ca/:id+", 

        destination: "/learn/categories/:id+", 
        permanent: true, 
        basePath: false, 
      },
      {
        source: "/dl/:id+", 

        destination: "/learn/course/:id+", 
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
