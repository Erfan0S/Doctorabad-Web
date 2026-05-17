import { Metadata } from "next";
import { homeMetadata as sharedHomeMetadataFactory } from "@repo/core/metadata/home";

const title = "دکترآباد | داروخانه من";
const description =
  "جستجو و بررسی کامل داروها، کاربرد، عوارض جانبی، تداخلات دارویی، دسته‌بندی تخصصی داروها و اطلاعات دارویی معتبر در داروخانه دکترآباد.";

const sharedHomeMetadata = sharedHomeMetadataFactory(
  "/pharmacy",
  title,
  description,
);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,

  title,

  description,

  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),

    "دارو",
    "اطلاعات دارویی",
    "داروخانه آنلاین",
    "جستجوی دارو",
    "بررسی دارو",
    "داروخانه اینترنتی",
    "اطلاعات پزشکی",
    "pharmacy",
    "drug information",
    "medical drugs",

    "عوارض دارو",
    "تداخل دارویی",
    "موارد مصرف دارو",
    "دوز دارو",
    "نحوه مصرف دارو",
    "نام داروها",
    "داروهای پزشکی",
    "اطلاعات قرص",
    "اطلاعات کپسول",
    "راهنمای دارو",

    "اطلاعات کامل دارو",
    "بررسی تخصصی دارو",
    "داروهای تخصصی",
    "drug interactions",
    "side effects",
    "dosage guide",

    "داروخانه دکترآباد",
    "pharmacy doctorabad",
    "doctorabad pharmacy",
  ],

  openGraph: {
    ...sharedHomeMetadata.openGraph,
    title,
    description,
    url: "/pharmacy",
    type: "website",
    locale: "fa_IR",
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
  },

  alternates: {
    canonical: "/pharmacy",
  },
};