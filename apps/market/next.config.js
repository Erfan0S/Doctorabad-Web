import initPwa from "next-pwa";
import path from "path";

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
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://drabadapp.ir/:path*",
        // destination: "http://185.231.180.170/:path*",
        basePath: false,
      },
      {
        source: "/mag/:path*",
        destination: `https://mag.doctorabad.com/:path*`,
      },
    ];
  },
});
