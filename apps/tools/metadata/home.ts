import { Metadata } from "next";
import { homeMetadata as sharedHomeMetadataFactory } from "@repo/core/metadata/home";

const title = "دکترتولز | مرکز ابزار دکترآباد";
const description =
  "دیتابیس‌ها و ماشین‌حساب‌های تخصصی علوم‌پزشکی؛ ابزارهای تخصصی و رایگان دکترآباد برای تصمیم‌گیری بالینی دقیق: آپتودیت رایگان و مرجع محاسبه سریع GFR ، BMI ، CHADS ، GCS ، مایع نگهدارنده ، FENa ، اصلاح کلسیم ، MAP ، آپگار ، سن جنین و پیش‌بینی تاریخ زایمان";

const sharedHomeMetadata = sharedHomeMetadataFactory(
  "/tools",
  title,
  description,
);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,

  title,

  description,

  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),

    "آپتودیت",
    "آپ تو دیت",
    "uptodate",
    "up to date",
    "آپتودیت رایگان",
    "رایگان",
    "دانلود آپتودیت",
    "GFR",
    "BMI",
    "CHADS2",
    "GCS",
    "مایع نگهدارنده",
    "FENa",
    "اصلاح کلسیم",
    "MAP",
    "آپگار",
    "سن جنین و پیش‌بینی تاریخ زایمان",
    "TIMI SCORE",
    "ASCVD",
    "ABCD2",
    "معیارهای ولز",
    "wells score PTE",
    "DVT",
    "Alvarado",
    "Hasbled score",
  ],

  openGraph: {
    ...sharedHomeMetadata.openGraph,
    title,
    description,
    url: "/tools",
    type: "website",
    locale: "fa_IR",
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
  },

  alternates: {
    canonical: "/tools",
  },
};
