import { Metadata, Viewport } from "next";

export const homeMetadata: Metadata = {
  title: "دکترآباد",
  description: "دکترآباد | سرزمین علوم پزشکی کشور",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "دکترآباد",
    "علوم‌پزشکی",
    "دارو",
    "داروخانه",
    "دکتر",
    "پزشک",
    "پزشکی",
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/icon_144.png" },
    { rel: "icon", url: "icon_144.png" },
  ],
};

export const homeViewPort: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: { media: "(prefers-color-scheme: dark)", color: "#fff" },
};
