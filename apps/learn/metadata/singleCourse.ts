import { api } from "@/api/Api";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { Metadata } from "next";
import { generateProductMetaData } from "@repo/core/metadata/singleProduct";
import { OrderType } from "@repo/core/types/cart";

export const generateLearnProductMetaData = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const productFetcher = api.getCourse(Number(params.id));
    const { data } = await productFetcher;
    const { title, course_pic, meta_description, keywords, id } = data.data;
    return generateProductMetaData({
      productData: async () => ({
        title,
        description: meta_description || "",
        keywords: keywords || [],
        product_pic: course_pic,
        siteName: "Market",
        url: generateSingleProductUrlFromId(id, "", OrderType.Course),
      }),
    });
  } catch (error) {
    return { title: "دکترآباد | دوره" };
  }
};
