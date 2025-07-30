import { Metadata, Viewport } from "next";

export const homeMetadata = (baseUrl: string = ""): Metadata => ({
  title: "دکترآباد",
  description: "دکترآباد | سرزمین علوم پزشکی کشور",
  generator: "Next.js",
  manifest: `${baseUrl}/manifest.webmanifest`,
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
    { rel: "apple-touch-icon", url: `${baseUrl}/icon_144.png` },
    { rel: "icon", url: `${baseUrl}/favicon.ico` },
  ],
});

export const homeViewPort: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: { media: "(prefers-color-scheme: dark)", color: "#fff" },
};
