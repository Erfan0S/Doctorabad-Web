import { Metadata } from "next";
import { homeMetadata as SharedHomeMetadata } from "@repo/core/metadata/home";

const title = "دکتراگزم | مرکز آزمون دکترآباد";
const description =
  "آزمون‌های تخصصی علوم پزشکی، تست‌های آنلاین و آمادگی امتحانات";

const sharedHomeMetadata = SharedHomeMetadata("/exam", title, description);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,
  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),
    "آزمون پزشکی",
    "تست آنلاین",
    "ارزیابی",
    "امتحان پزشکی",
    "آزمون تخصصی",
    "بانک سوال",
    "تمرین سوال",
  ],
};
