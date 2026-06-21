import { api } from "@/api/Api";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { Metadata } from "next";
import { generateProductMetaData } from "@repo/core/metadata/singleProduct";
import { OrderType } from "@repo/core/types/cart";

export const generateMarketProductMetaData = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const productFetcher = isNaN(Number(params.id))
      ? api.getSingleProductBySlug(params.id)
      : api.getSingleProduct(Number(params.id));
    const { data } = await productFetcher;
    const { title, product_pic, meta_description, keywords, id, slug } =
      data.data;

    return generateProductMetaData({
      productData: async () => ({
        title,
        description: meta_description,
        keywords,
        product_pic,
        siteName: "Market",
        url: generateSingleProductUrlFromId(id, slug, OrderType.ShopProduct),
      }),
    });
  } catch (error) {
    return { title: "دکترآباد | محصول" };
  }
};
