import { Metadata } from "next";
import { homeMetadata as sharedHomeMetadataFactory } from "@repo/core/metadata/home";

const title = "دکتراباد | کلینیک من";

const description =
  "بررسی کامل بیماری‌ها، علائم، علل، روش‌های تشخیص، درمان، پیشگیری و دسته‌بندی تخصصی بیماری‌ها در کلینیک دکترآباد.";

const sharedHomeMetadata = sharedHomeMetadataFactory(
  "/clinic",
  title,
  description,
);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,

  title,

  description,

  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),

    "بیماری",
    "اطلاعات بیماری",
    "کلینیک آنلاین",
    "علائم بیماری",
    "تشخیص بیماری",
    "درمان بیماری",
    "بیماری های پزشکی",
    "بیماری داخلی",
    "راهنمای بیماری",
    "medical conditions",
    "disease information",
    "symptoms and treatment",
    "medical clinic",

    "علت بیماری",
    "پیشگیری بیماری",
    "نشانه های بیماری",
    "درمان خانگی بیماری",
    "بیماری های شایع",
    "بیماری های تخصصی",
    "روش تشخیص بیماری",
    "عوارض بیماری",

    "اطلاعات پزشکی",
    "دانشنامه پزشکی",
    "مرجع بیماری ها",
    "علائم و درمان",
    "medical encyclopedia",
    "disease symptoms",
    "disease treatment",

    "کلینیک دکترآباد",
    "doctorabad clinic",
    "clinic doctorabad",
  ],

  openGraph: {
    ...sharedHomeMetadata.openGraph,

    title,

    description,

    url: "/clinic",

    type: "website",

    locale: "fa_IR",

    siteName: "کلینیک دکترآباد",
  },

  twitter: {
    card: "summary_large_image",

    title,

    description,
  },

  alternates: {
    canonical: "/clinic",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
