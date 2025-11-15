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
    domains: ["s3.ir-thr-at1.arvanstorage.ir", "doctoabad.com", "drabadapp.ir", "arvanstorage.ir"],
  },
  

};

export default withPWAFunc(nextConfig);
