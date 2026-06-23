import { Metadata, Viewport } from "next";
import { baseUrls } from "../constants/routePath";

export const homeMetadata = (
  baseUrl: string = "",
  title?: string,
  description?: string,
): Metadata => {
  const defaultTitle = "دکترآباد | سرزمین علوم پزشکی کشور";
  const defaultDescription =
    "پلتفرم ۳۶۰ درجه بهداشت، درمان، آموزش و پرورش علوم پزشکی است که با تاکید بر نوآوری و جامعیت پایه‌گذاری گردیده و انتخاب اول گروه علوم‌پزشکی کشور برای رفع نیازهای روزمره است.";

  return {
    title: title || defaultTitle,
    description: description || defaultDescription,
    generator: "Next.js",
    manifest: `${baseUrl}/manifest.webmanifest`,
    keywords: [
      "دکترآباد",
      "دکتر آباد",
      "دکتراباد",
      "دکتر اباد",
      "کدخدای دکترآباد",
      "doctor abad",
      "دکترآبادی",
      "دکترلند",
      "آموزش پزشکی",
      "دکترلرن",
      "دکترمارکت",
      "دکتردانلود",
      "دکتراگزم",
      "دکترتولز",
      "دکترکست",
      "دکترکلاب",
      "دکترپرو",
      "بهداشت",
      "درمان",
      "Doctorabad",
      "Doctorabad.com",
      "doctorabad.ir",
      "پزشکی",
      "دندانپزشکی",
      "داروسازی",
      "علوم آزمایشگاهی",
      "پرستاری",
      "اپلیکیشن دکترآباد",
      "vnhcgfhv",
      "اپلیکیشن",
      "اپ",
      "drabad",
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
