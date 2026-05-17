import { Metadata } from "next";
import { homeMetadata as sharedHomeMetadataFactory } from "@repo/core/metadata/home";

const title = "دکترآباد | ابزارهای من";
const description =
  "مجموعه کامل ابزارهای پزشکی، ماشین حساب‌های بالینی و اسکورهای ارزیابی شامل BMI، GFR، GCS، APGAR، CHADS2، HAS-BLED، Wells Score و سایر Clinical Calculators در دکترآباد.";

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

    "ابزارهای پزشکی",
    "ماشین حساب پزشکی",
    "محاسبات پزشکی",
    "کلینیکال کالکولاتور",
    "clinical calculators",
    "medical calculators",
    "doctorabad tools",
    "ابزارهای بالینی",
    "clinical tools",
    "medical tools",

    "Apgar score",
    "اپگار",
    "Alvarado score",
    "آپاندیسیت",
    "GFR calculator",
    "نرخ فیلتراسیون گلومرولی",
    "MAP calculator",
    "فشار متوسط شریانی",
    "BMI calculator",
    "شاخص توده بدنی",

    "Calcium correction",
    "تصحیح کلسیم",
    "albumin corrected calcium",

    "GCS",
    "Glasgow Coma Scale",
    "مقیاس کمای گلاسکو",

    "Pregnancy calculator",
    "محاسبه سن بارداری",
    "زمان زایمان",

    "FENa",
    "Fractional Excretion of Sodium",
    "کسر دفعی سدیم",

    "HAS-BLED",
    "HAS-BLED score",
    "ریسک خونریزی",

    "CHA2DS2-VASc",
    "CHA2DS2 VASc",
    "ریسک سکته مغزی",

    "CHADS2",
    "CHADS2 score",

    "Maintenance fluids",
    "مایع نگهدارنده",
    "سرم درمانی",

    "ABCD2 score",
    "ریسک سکته مغزی",

    "Wells score",
    "Wells PTE",
    "Wells DVT",
    "ترومبوآمبولی ریوی",
    "DVT score",
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