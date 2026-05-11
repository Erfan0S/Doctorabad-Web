import { api } from "@/api/Api";
import { baseUrls, downloadPaths, learnPaths } from "@repo/core/constants/routePath";
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
      picture,
      description,
      id,
      summary: meta_description,
    } = data.publisher;
    return {
      title,
      description: meta_description,
      openGraph: {
        title,
        description: meta_description || "ناشر",
        images: picture,
        url: `${baseUrls.download}/publishers/${id}`,
        siteName: "دکتر‌لرن",
      },
      twitter: {
        title,
        description: meta_description || "",
        images: picture,
        card: "summary_large_image",
      },
    };
  } catch (error) {
    return { title: "دکترآباد | ارایه دهنده" };
  }
};
