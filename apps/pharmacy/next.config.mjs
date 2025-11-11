import withPWA from "next-pwa";

const withPWAFunc = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
};

export default withPWAFunc(nextConfig);
