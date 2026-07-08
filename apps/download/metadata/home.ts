import { Metadata } from "next";
import { homeMetadata as SharedHomeMetadata } from "@repo/core/metadata/home";

const title = "دکتردانلود | مرکز محتوا دکترآباد";
const description =
  "بازارچه جامع فایل‌های دیجیتال علوم پزشکی؛ کتاب‌های الکترونیک، رفرنس‌‌ها، اطلس‌‌ها، لغتنامه‌‌ها، جمع‌بندی‌ها، دستنامه‌ها، مجلات و نرم‌افزارها با دانلود رایگان و فیلترهای پیشرفته ";

const sharedHomeMetadata = SharedHomeMetadata("/download", title, description);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,
  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),
    "دانلود",
    "هاریسون",
    "هریسون",
    "دکتردانلود",
    "دکتر دانلود",
    "فایل الکترونیک",
    "الکترونیک",
    "مرکز دانلود",
    "دکترآباد",
    "دکتر آباد",
    "دکتراباد",
    "doctorabad",
    "doctor abad",
    "رفرنس",
    "اطلس",
    "لغتنامه",
    "دستنامه",
    "مجله",
    "جمع بندی",
    "دستنامه",
    "نرم افزار",
    "علوم پایه",
    "پزشکی",
    "دانلود رایگان",
    "دیجیتال",
    "PDF",
    "EPUB",
    "کتاب الکترونیک",
    "الکترونیک",
    "رایگان",
    "doctor download",
    "download",
    "کتابخوان",
    "کتاب",
    "افست",
    "دندانپزشکی",
    "داروسازی",
    "پرستاری",
    "مامایی",
    "دستیاری",
    "آزمون",
    "dl",
  ],
};
