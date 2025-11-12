import { Metadata, Viewport } from "next";
import { baseUrls } from "../constants/routePath";

export const homeMetadata = (
  baseUrl: string = "",
  title?: string,
  description?: string
): Metadata => {
  const defaultTitle = "دکترآباد | سرزمین علوم پزشکی کشور";
  const defaultDescription =
    "دکترآباد - پلتفرم جامع آموزش، آزمون و بازار محصولات پزشکی";

  return {
    title: title || defaultTitle,
    description: description || defaultDescription,
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
    twitter: {
      card: "summary_large_image",
      title: title || defaultTitle,
      description: description || defaultDescription,
      images: [`${baseUrl}/icon_144.png`],
    },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: baseUrls.base + baseUrl,
      siteName: "دکترآباد",
      title: title || defaultTitle,
      description: description || defaultDescription,
      images: [
        {
          url: `${baseUrl}/icon_144.png`,
          width: 144,
          height: 144,
          alt: "دکترآباد",
        },
      ],
    },
    icons: [
      { rel: "apple-touch-icon", url: `${baseUrl}/icon_144.png` },
      { rel: "icon", url: `${baseUrl}/favicon.ico` },
    ],
  };
};

export const homeViewPort: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: { media: "(prefers-color-scheme: dark)", color: "#fff" },
};
