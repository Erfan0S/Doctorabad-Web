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
    const productFetcher = isNaN(Number(params.id))
      ? api.getExamDetail(Number(params.id))
      : api.getExamDetail(Number(params.id));
    const { data } = await productFetcher;
    const { title, id } = data.exam;
    return {
      title,
      description: "description",
      keywords: "keywords",
      openGraph: {
        title,
        description: "description",
        url: `${baseUrls.market}${generateSingleProductUrlFromId(id, "", OrderType.Course)}`,
        siteName: "مرکز آموزش",
      },
      twitter: {
        title,
        description: "description",
        card: "summary_large_image",
      },
    };
  } catch (error) {
    return { title: "دکترآباد | آزمون" };
  }
};
