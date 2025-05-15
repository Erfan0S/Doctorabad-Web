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
      ? api.getCourse(Number(params.id))
      : api.getCourse(Number(params.id));
    const { data } = await productFetcher;
    const { title, course_pic, meta_description, keywords, id } = data.data;
    return {
      title,
      description: meta_description,
      keywords: keywords,
      openGraph: {
        title,
        description: meta_description || "",
        images: course_pic,
        url: `${baseUrls.market}${generateSingleProductUrlFromId(id, "", OrderType.Course)}`,
        siteName: "دکترمارکت",
      },
      twitter: {
        title,
        description: meta_description || "",
        images: course_pic,
        card: "summary_large_image",
      },
    };
  } catch (error) {
    return { title: "دکترآباد | دوره" };
  }
};
