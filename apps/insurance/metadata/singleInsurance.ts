import { Metadata } from "next";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";

export const generateInsuranceMetaData = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Metadata => {
  const insurerTitle = (searchParams.insurer_title as string) || "بیمه مسئولیت";
  const fieldTitle = (searchParams.field_title as string) || "";
  const gradeTitle = (searchParams.grade_title as string) || "";
  const insurerLogo = (searchParams.insurer_logo as string) || "";

  // ایجاد عنوان داینامیک و بهینه برای سئو
  const dynamicTitle = ` دکترآباد | خرید آنلاین  ${insurerTitle}${fieldTitle ? ` - ${fieldTitle}` : ""}${gradeTitle ? ` (${gradeTitle})` : ""}`;
  
  // ایجاد توضیحات داینامیک برای افزایش نرخ کلیک (CTR)
  const dynamicDescription = `خرید و صدور آنلاین بیمه مسئولیت حرفه‌ای ${insurerTitle} برای ${fieldTitle || "پزشکان و پیراپزشکان"} ${gradeTitle ? `تخصص ${gradeTitle}` : ""} با بهترین قیمت و تخفیف‌های ویژه در سامانه دکترآباد.`;

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    openGraph: {
      title: dynamicTitle,
      description: dynamicDescription,
      images: insurerLogo ? [insurerLogo] : [`${baseUrls[Apps.INSURANCE]}/icon_144.png`],
      type: "website",
      siteName: "دکترآباد | دکتربیمه",
      locale: "fa_IR",
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: dynamicDescription,
      images: insurerLogo ? [insurerLogo] : [`${baseUrls[Apps.INSURANCE]}/icon_144.png`],
    },
    keywords: [
      "بیمه مسئولیت پزشکان",
      "بیمه مسئولیت پیراپزشکان",
      "خرید آنلاین بیمه",
      "استعلام قیمت بیمه",
      insurerTitle,
      fieldTitle,
      gradeTitle,
      "دکترآباد",
      "دکتربیمه",
    ].filter(Boolean) as string[],
    robots: {
      index: true,
      follow: true,
    },
  };
};
