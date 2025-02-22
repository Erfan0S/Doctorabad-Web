import { api } from "@/api/Api";
import { generateSingleProductUrlFromId } from "@repo/core/utils/urlutils";
import { Metadata } from "next";

export const generateProductMetaData = async ({
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
    return {
      title,
      description: meta_description,
      keywords: keywords,
      openGraph: {
        title,
        description: meta_description,
        images: product_pic,
        url: `https://drabadapp.ir/doctormarket/${generateSingleProductUrlFromId(id, slug)}`,
        siteName: "دکترمارکت",
      },
      twitter: {
        title,
        description: meta_description,
        images: product_pic,
        card: "summary_large_image",
      },
    };
  } catch (error) {
    return { title: "دکترآباد | محصول" };
  }
};
