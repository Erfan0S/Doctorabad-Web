import { Metadata } from "next";
import { homeMetadata as SharedHomeMetadata } from "@repo/core/metadata/home";

const title = "دکتردانلود | مرکز محتوا دکترآباد";
const description =
  "مرکز دانلود منابع علمی، جزوات تخصصی، کتب دیجیتال و پکیج‌های آموزشی علوم پزشکی؛ دسترسی سریع به برترین محتوای آموزشی.";

const sharedHomeMetadata = SharedHomeMetadata("/download", title, description);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,
  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),
    "دانلود منابع پزشکی",
    "جزوات علوم پزشکی",
    "کتب دیجیتال پزشکی",
    "پکیج‌های آموزشی",
    "محتوای علمی",
    "دانلود رایگان جزوه",
    "منابع آزمون پزشکی",
    "دکترآباد",
  ],
};
