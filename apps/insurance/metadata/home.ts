import { Metadata } from "next";
import { homeMetadata as sharedHomeMetadataFactory } from "@repo/core/metadata/home";

const title = "دکتراباد | بیمه من";
const description =
  "جست‌وجو و بررسی بیماری‌ها، دسته‌بندی‌های تخصصی و اطلاعات کامل هر بیماری در کلینیک دکترآباد.";

const sharedHomeMetadata = sharedHomeMetadataFactory(
  "/insurance",
  title,
  description,
);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,
  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),
    "کلینیک آنلاین",
    "استعلام بیماری",
    "دسته‌بندی بیماری",
    "اطلاعات بیماری",
    "clinic doctorabad",
  ],
};

