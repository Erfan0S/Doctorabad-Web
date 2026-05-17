import { clinicApi } from "@/api/Api";
import { baseUrls, clinicPaths } from "@repo/core/constants/routePath";
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

const truncate = (text: string, max = 170) => {
  if (text.length <= max) return text;
  return text.slice(0, max).trim() + "...";
};

const isAccessible = (value: any) => {
  return value && value !== "__NO_ACCESS__";
};

const extractText = (item: any): string => {
  if (!item || item === "__NO_ACCESS__") return "";

  if (Array.isArray(item)) {
    return item.join(" ");
  }

  if (typeof item === "string") {
    return item;
  }

  return "";
};

export const generateDiseaseMetaData = async ({
  params,
}: Params): Promise<Metadata> => {
  try {
    const diseaseId = Number(params.id);

    if (Number.isNaN(diseaseId)) {
      throw new Error("invalid id");
    }

    const response = await clinicApi.getDiseaseDetails(diseaseId);

    const disease = response.data.data;

    const faTitle = disease.title_fa?.trim();
    const enTitle = disease.title_en?.trim();

    const title =
      faTitle || enTitle
        ? `دکترآباد | ${faTitle || enTitle}`
        : "کلینیک من | دکترآباد";

    const preface = extractText(disease.introduction?.preface);

    const definition = extractText(disease.introduction?.definition);

    const diseaseType = extractText(disease.introduction?.type);

    const treatment = disease.treatment_description;

    const treatmentText =
      typeof treatment === "string"
        ? treatment
        : extractText(treatment?.plan) ||
          extractText(treatment?.order) ||
          extractText(treatment?.prescription);

    const metaDescription =
      stripHtml(disease.meta_description) ||
      stripHtml(preface) ||
      stripHtml(definition) ||
      stripHtml(diseaseType) ||
      stripHtml(
        isAccessible(disease.epidemiology) ? disease.epidemiology : "",
      ) ||
      stripHtml(
        isAccessible(disease.physiopathology) ? disease.physiopathology : "",
      ) ||
      stripHtml(
        isAccessible(disease.risk_factor)
          ? extractText(disease.risk_factor)
          : "",
      ) ||
      stripHtml(
        isAccessible(disease.differential_diagnosis_description)
          ? extractText(disease.differential_diagnosis_description)
          : "",
      ) ||
      stripHtml(isAccessible(treatmentText) ? treatmentText : "") ||
      "بررسی کامل بیماری، علائم، علل، تشخیص، درمان و پیشگیری در کلینیک دکترآباد.";

    const description = truncate(metaDescription);

    const image =
      disease.picture || disease.files?.[0]?.file || disease.files?.[3]?.file;

    const url = `${baseUrls[Apps.CLINIC]}${clinicPaths.single}/${disease.id}`;

    const keywords = [
      faTitle,
      enTitle,

      ...(disease.keywords || []),

      `${faTitle} چیست`,
      `علائم ${faTitle}`,
      `درمان ${faTitle}`,
      `تشخیص ${faTitle}`,
      `پیشگیری ${faTitle}`,

      "اطلاعات بیماری",
      "علائم بیماری",
      "درمان بیماری",
      "تشخیص بیماری",
      "بیماری های پزشکی",
      "medical condition",
      "disease information",
      "symptoms",
      "treatment",
      "diagnosis",
    ].filter(Boolean);

    return {
      title,

      description,

      keywords,

      metadataBase: new URL(baseUrls[Apps.CLINIC]),

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

        siteName: "کلینیک دکترآباد",

        images: image
          ? [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: faTitle || enTitle || "بیماری",
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
      title: "کلینیک دکترآباد | اطلاعات بیماری‌ها",

      description:
        "بررسی بیماری‌ها، علائم، تشخیص، درمان و اطلاعات تخصصی پزشکی در دکترآباد.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }
};
