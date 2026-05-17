import { pharmacyApi } from "@/api/Api";
import { baseUrls, pharmacyPaths } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import type { Metadata } from "next";

type Params = {
  params: { id: string };
};

const stripHtml = (value?: string | null) => {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const truncate = (text: string, max = 160) => {
  if (text.length <= max) return text;
  return text.slice(0, max).trim() + "...";
};

export const generateMedicineMetaData = async ({
  params,
}: Params): Promise<Metadata> => {
  try {
    const medicineId = Number(params.id);

    if (Number.isNaN(medicineId)) {
      throw new Error("invalid id");
    }

    const response = await pharmacyApi.getMedicineDetails(medicineId);

    const medicine = response.data.data;

    const faTitle = medicine.title_fa?.trim();
    const enTitle = medicine.title_en?.trim();

    const title =
      faTitle || enTitle
        ? `دکترآباد | ${faTitle || enTitle}`
        : "داروخانه من | دکترآباد";

    const metaDescription =
      stripHtml(medicine.meta_description) ||
      stripHtml(medicine.use_case) ||
      stripHtml(medicine.effect_mechanism) ||
      stripHtml(medicine.points) ||
      stripHtml(medicine.prevention) ||
      "بررسی کامل دارو، موارد مصرف، عوارض جانبی، تداخلات دارویی و دوز مصرف در داروخانه دکترآباد.";

    const description = truncate(metaDescription, 170);

    const image = medicine.picture;

    const url = `${baseUrls[Apps.PHARMACY]}${pharmacyPaths.single}/${medicine.id}`;

    const categories =
      medicine.categories?.map((item: any) => item.title).filter(Boolean) || [];

    const brands = medicine.brands || [];

    const keywords = [
      faTitle,
      enTitle,

      ...(medicine.keywords || []),

      ...categories,

      ...brands,

      "اطلاعات دارویی",
      "عوارض دارو",
      "تداخل دارویی",
      "دوز مصرف",
      "موارد مصرف دارو",
      "داروخانه آنلاین",
      "drug information",
      "side effects",
      "drug interactions",
      "dosage guide",
    ].filter(Boolean);

    return {
      title,

      description,

      keywords,

      metadataBase: new URL(baseUrls[Apps.PHARMACY]),

      alternates: {
        canonical: url,
      },

      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      openGraph: {
        title,

        description,

        url,

        type: "article",

        locale: "fa_IR",

        siteName: "داروخانه دکترآباد",

        images: image
          ? [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: faTitle || enTitle || "دارو",
              },
            ]
          : undefined,
      },

      twitter: {
        card: "summary_large_image",

        title,

        description,

        images: image ? [image] : undefined,
      },
    };
  } catch (error) {
    return {
      title: "داروخانه دکترآباد | اطلاعات دارویی",

      description:
        "بررسی داروها، عوارض، تداخلات دارویی و اطلاعات تخصصی دارو در دکترآباد.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }
};
