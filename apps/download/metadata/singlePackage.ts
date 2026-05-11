import { api } from "@/api/Api";
import { baseUrls, routePath } from "@repo/core/constants/routePath";
import { OrderType } from "@repo/core/types/cart";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { Metadata } from "next";

export const generateProductMetaData = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const productFetcher = api.getPackage(Number(params.id));
    const { data } = await productFetcher;
    const { title, picture, description ,id } = data.data;
    return {
      title,
      description: description,
      openGraph: {
        title,
        description: description || "محتوا",
        images: picture,
        url: `${generateSingleProductUrlFromId(id, "", OrderType.Package)}`,
        siteName: "دکتردانلود",
      },
      twitter: {
        title,
        description: description || "",
        images: picture,
        card: "summary_large_image",
      },
    };
  } catch (error) {
    return { title: "دکترآباد | محتوا" };
  }
};
