import { clinicApi } from "@/api/Api";
import { baseUrls, clinicPaths } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import type { Metadata } from "next";

type Params = {
  params: { id: string };
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

    const title =
      disease.title_fa ||
      disease.title_en ||
      "جزئیات بیماری | کلینیک دکترآباد";

    const description =
      disease.use_case ||
      disease.effect_mechanism ||
      "اطلاعات کامل بیماری انتخابی شما در کلینیک دکترآباد.";

    const image = disease.picture;
    const url = `${baseUrls[Apps.CLINIC]}${clinicPaths.single}/${disease.id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: "دکترآباد | کلینیک من",
        images: image
          ? [
              {
                url: image,
                alt: title,
              },
            ]
          : undefined,
      },
      twitter: {
        title,
        description,
        card: "summary_large_image",
        images: image ? [image] : undefined,
      },
    };
  } catch (error) {
    return {
      title: "کلینیک دکترآباد",
      description: "اطلاعات بیماری در کلینیک دکترآباد.",
    };
  }
};
