import { Metadata } from "next";
import { homeMetadata as sharedHomeMetadataFactory } from "@repo/core/metadata/home";

const title =
  "دکترآباد | بیمه من";

const description =
  "مقایسه و بررسی بیمه‌های درمانی، پوشش بیمه، قیمت، فرانشیز، شرایط بیمه و خرید آنلاین بیمه در دکترآباد.";

const sharedHomeMetadata = sharedHomeMetadataFactory(
  "/insurance",
  title,
  description,
);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,

  title,

  description,

  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),

    // Generic
    "بیمه",
    "بیمه درمانی",
    "بیمه سلامت",
    "بیمه تکمیلی",
    "بیمه پزشکی",
    "خرید بیمه",
    "استعلام بیمه",
    "مقایسه بیمه",
    "insurance",
    "health insurance",
    "medical insurance",

    // Intent based
    "قیمت بیمه",
    "پوشش بیمه",
    "فرانشیز بیمه",
    "شرایط بیمه",
    "طرح های بیمه",
    "بهترین بیمه درمانی",
    "بیمه آنلاین",
    "خرید آنلاین بیمه",
    "استعلام بیمه درمانی",
    "مقایسه بیمه درمانی",

    // SEO long-tail
    "بیمه تکمیلی درمان",
    "بیمه خدمات پزشکی",
    "هزینه بیمه درمانی",
    "پوشش دارویی بیمه",
    "بیمه بیمارستانی",
    "insurance plans",
    "insurance coverage",
    "healthcare insurance",

    // Brand
    "بیمه دکترآباد",
    "doctorabad insurance",
    "insurance doctorabad",
  ],

  openGraph: {
    ...sharedHomeMetadata.openGraph,

    title,

    description,

    url: "/insurance",

    type: "website",

    locale: "fa_IR",

    siteName: "بیمه دکترآباد",
  },

  twitter: {
    card: "summary_large_image",

    title,

    description,
  },

  alternates: {
    canonical: "/insurance",
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