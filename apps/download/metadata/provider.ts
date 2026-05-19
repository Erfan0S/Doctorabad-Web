import { api } from "@/api/Api";
import { baseUrls } from "@repo/core/constants/routePath";
import { Metadata } from "next";

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

export const generateProviderMetaData = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const { data } = await api.getSingleProvider(
      Number(params.id),
    );

    const publisher = data.publisher;
    const products = data.data ?? [];

    const title =
      publisher?.name?.trim() || "ناشر پزشکی";

    const categories = Array.from(
      new Set(
        products
          .flatMap((item) =>
            item.category?.map((category) => category.title) ?? [],
          )
          .filter(Boolean),
      ),
    );

    const years = Array.from(
      new Set(
        products
          .map((item) => item.publish_date)
          .filter((date): date is string => Boolean(date)),
      ),
    );

    const providerDescription =
      stripHtml(publisher?.summary) ||
      stripHtml(publisher?.description);

    const fallbackDescription = [
      `${products.length} منبع آموزشی پزشکی`,
      categories.slice(0, 3).join("، "),
      years.length
        ? `انتشارات ${Math.max(
            ...years.map(Number),
          )}`
        : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const description = truncate(
      providerDescription ||
        fallbackDescription ||
        "مشاهده کتاب‌ها، منابع آموزشی و محصولات این ناشر در دکترآباد.",
    );

    const seoTitle = [
      "دکترآباد",
      title,
    ].join(" | ");

    const image = publisher?.picture;

    const url = `${baseUrls.download}/publishers/${publisher.id}`;

    const keywords = [
      title,

      ...(categories ?? []),

      ...years,

      "ناشر پزشکی",
      "کتاب پزشکی",
      "منابع پزشکی",
      "USMLE",
      "آموزش پزشکی",
      "کتاب الکترونیک پزشکی",
      "medical publisher",
      "medical books",
      "medical education",
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
      },

      openGraph: {
        title: seoTitle,

        description,

        url,

        type: "profile",

        siteName: "دکترآباد",

        locale: "fa_IR",

        images: image
          ? [
              {
                url: image,
                alt: title,
                width: 1200,
                height: 630,
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
  } catch {
    return {
      title: "ناشران پزشکی | دکترآباد",

      description:
        "مشاهده ناشران و منابع آموزشی پزشکی در دکترآباد.",

      robots: {
        index: true,
        follow: true,
      },
    };
  }
};