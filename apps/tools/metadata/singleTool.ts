import { Metadata } from "next";
import { ALL_TOOLS } from "../data/toolsData";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";

export const generateToolMetaData = (toolId: string): Metadata => {
  const tool = ALL_TOOLS.find((t) => t.id === toolId);

  if (!tool) {
    return {
      title: "ابزار پزشکی | دکترآباد",
      description: "ابزارهای محاسبه‌گر تخصصی علوم پزشکی در دکترآباد",
    };
  }

  const title =`دکترآباد | ابزار ${tool.title}`;
  const description = `${tool.description} - محاسبه‌گر آنلاین و تخصصی علوم پزشکی در سامانه دکترآباد.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "دکترآباد | دکترتولز",
      locale: "fa_IR",
      images: [`${baseUrls[Apps.TOOLS]}/icon_144.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrls[Apps.TOOLS]}/icon_144.png`],
    },
    keywords: [
      tool.title,
      "ابزار پزشکی",
      "محاسبه‌گر پزشکی",
      "دکترآباد",
      "دکترتولز",
      "تجهیزات پزشکی",
      "نرم‌افزار پزشکی",
    ],
    robots: {
      index: true,
      follow: true,
    },
  };
};
