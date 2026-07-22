import { api } from "@/api/Api";
import { OrderType } from "@repo/core/types/cart";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import type { Metadata } from "next";

const stripHtml = (value?: string | null) => {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const truncate = (text: string, max = 170) => {
  if (text.length <= max) return text;
  return text.slice(0, max).trim() + "...";
};

export const generateProductMetaData = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const { data } = await api.getPackage(Number(params.id));

    const product = data.data;

    const title = product.title?.trim();

    const categoryTitles = product.category?.map((item) => item.title) ?? [];

    const subjectTitles = product.subjects?.map((item) => item.title) ?? [];

    const fieldTitles = product.fields?.map((item) => item.title) ?? [];

    const gradeTitles = product.grades?.map((item) => item.title) ?? [];

    // Description fallback chain
    const descriptionText =
      stripHtml(product.meta_description) ||
      stripHtml(product.description) ||
      [
        categoryTitles[0],
        subjectTitles[0],
        product.edition ? `ویرایش ${product.edition}` : null,
        product.publish_date ? `سال انتشار ${product.publish_date}` : null,
      ]
        .filter(Boolean)
        .join(" | ") ||
      "مشاهده مشخصات، توضیحات و جزئیات کامل محتوا در دکترآباد.";

    const description = truncate(descriptionText);

    const seoTitle = title ? `دانلود ${title} | دکتردانلود` : "دکتردانلود";

    const image = product.picture || product.provider_picture;

    const url = generateSingleProductUrlFromId(
      product.id,
      "",
      OrderType.Package,
    );

    const keywords = [
      title,

      ...(product.keywords ?? []),

      ...categoryTitles,
      ...subjectTitles,
      ...fieldTitles,
      ...gradeTitles,

      product.publish_date,
      product.edition,

      "کتاب پزشکی",
      "منبع پزشکی",
      "محتوای آموزشی پزشکی",
      "دانلود کتاب پزشکی",
      "آموزش پزشکی",
      "medical education",
      "medical book",
      "ebook",
    ].filter(Boolean);

    return {
      title: seoTitle,

      description,

      keywords,

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
        title: seoTitle,

        description,

        url,

        type: "article",

        siteName: "دکترآباد",

        locale: "fa_IR",

        images: image
          ? [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: title,
              },
            ]
          : undefined,
      },

      twitter: {
        title: seoTitle,

        description,

        card: "summary_large_image",

        images: image ? [image] : undefined,
      },
    };
  } catch (error) {
    return {
      title: "دکترآباد | دکتردانلود",

      description: "کتاب‌ها، منابع و محتواهای آموزشی پزشکی در دکترآباد.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }
};
