import { api } from "@/api/Api";
import { baseUrls, learnPaths } from "@repo/core/constants/routePath";
import { Metadata } from "next";

export const generateProviderMetaData = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const productFetcher = api.getSingleProvider(Number(params.id));
    const { data } = await productFetcher;
    const {
      name: title,
      pic_url,
      description,
      id,
      summary: meta_description,
    } = data.provider;
    return {
      title,
      description: meta_description,
      openGraph: {
        title,
        description: meta_description || "ارایه دهنده",
        images: pic_url,
        url: `${baseUrls.learn}${learnPaths.provider}/${id}`,
        siteName: "دکتر‌لرن",
      },
      twitter: {
        title,
        description: meta_description || "",
        images: pic_url,
        card: "summary_large_image",
      },
    };
  } catch (error) {
    return { title: "دکترآباد | ارایه دهنده" };
  }
};
