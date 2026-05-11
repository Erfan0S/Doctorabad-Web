import { Metadata } from "next";
import { homeMetadata as SharedHomeMetadata } from "@repo/core/metadata/home";

const title = "دکتردانلود | مرکز محتوا دکترآباد";
const description =
  "دوره‌های آموزشی تخصصی علوم پزشکی، ویدیوهای آموزشی، مقالات و منابع علمی";

const sharedHomeMetadata = SharedHomeMetadata("/download", title, description);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,
  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),
    "آموزش پزشکی",
    "دوره‌های پزشکی",
    "ویدیوهای آموزشی",
    "مقالات پزشکی",
    "آموزش تخصصی",
    "علوم پزشکی",
    "یادگیری آنلاین",
  ],
};
