import { Metadata } from "next";
import { homeMetadata as sharedHomeMetadataFactory } from "@repo/core/metadata/home";

const title = "دکتراباد | داروخانه من";
const description =
  "جست‌وجو و بررسی داروها، دسته‌بندی‌های تخصصی و اطلاعات کامل هر دارو در داروخانه دکترآباد.";

const sharedHomeMetadata = sharedHomeMetadataFactory(
  "/pharmacy",
  title,
  description,
);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,
  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),
    "داروخانه آنلاین",
    "استعلام دارو",
    "دسته‌بندی دارو",
    "اطلاعات دارویی",
    "pharmacy doctorabad",
  ],
};

