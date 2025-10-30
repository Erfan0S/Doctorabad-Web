import { api } from "@/api/Api";
import { baseUrls, routePath } from "@repo/core/constants/routePath";
import { OrderType } from "@repo/core/types/cart";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { Metadata } from "next";

export const generateSingleExamMetaData = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const productFetcher = api.getExamDetail(Number(params.id));
    const { data } = await productFetcher;
    const { title, id } = data.exam;
    return {
      title,
      openGraph: {
        title,
        url: `${baseUrls.market}${generateSingleProductUrlFromId(id, "", OrderType.Exam)}`,
        siteName: "دکترآباد | آزمون",
      },
      twitter: {
        title,
      },
    };
  } catch (error) {
    return { title: "دکترآباد | آزمون" };
  }
};
