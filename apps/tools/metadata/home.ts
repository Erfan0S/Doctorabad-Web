import { Metadata } from "next";
import { homeMetadata as sharedHomeMetadataFactory } from "@repo/core/metadata/home";

const title = "دکتراباد | ابزارهای من";
const description =
  "ابزارهای کاربردی پزشکی، محاسبات بالینی و معیارهای ارزیابی در دکترآباد.";

const sharedHomeMetadata = sharedHomeMetadataFactory(
  "/tools",
  title,
  description,
);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,
  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),
    "ابزارهای پزشکی",
    "محاسبات پزشکی",
    "ماشین حساب پزشکی",
    "clinical calculators",
    "tools doctorabad",
  ],
};

