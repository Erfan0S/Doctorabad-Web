import { Metadata } from "next";
import { homeMetadata as SharedHomeMetadata } from "@repo/core/metadata/home";

const title = "دکترمارکت | مرکز فروش دکترآباد";
const description = "خرید محصولات پزشکی، تجهیزات پزشکی و کتاب‌های آموزشی";

const sharedHomeMetadata = SharedHomeMetadata("/market", title, description);

export const homeMetadata: Metadata = {
  ...sharedHomeMetadata,
  keywords: [
    ...(sharedHomeMetadata.keywords as string[]),
    "خرید محصولات پزشکی",
    "خرید تجهیزات پزشکی",
    "تجهیزات پزشکی",
    "خرید کتاب‌های آموزشی",
    "خرید کتاب‌های پزشکی",
    "کتاب‌های پزشکی",
  ],
};
