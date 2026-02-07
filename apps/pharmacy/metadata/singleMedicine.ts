import { pharmacyApi } from "@/api/Api";
import { baseUrls, pharmacyPaths } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import type { Metadata } from "next";

type Params = {
  params: { id: string };
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

    const title =
      medicine.title_fa ||
      medicine.title_en ||
      "جزئیات دارو | داروخانه دکترآباد";

    const description =
      medicine.use_case ||
      medicine.effect_mechanism ||
      "اطلاعات کامل داروی انتخابی شما در داروخانه دکترآباد.";

    const image = medicine.picture;
    const url = `${baseUrls[Apps.PHARMACY]}${pharmacyPaths.single}/${medicine.id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: "دکترآباد | داروخانه من",
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
      title: "داروخانه دکترآباد",
      description: "اطلاعات دارو در داروخانه دکترآباد.",
    };
  }
};

