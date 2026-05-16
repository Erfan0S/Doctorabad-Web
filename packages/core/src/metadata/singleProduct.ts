import { Metadata } from "next";

type ProductMetadata = {
  title: string;
  description: string;
  keywords: string[];
  product_pic: string;
  siteName: string;
  url: string;
};

export const generateProductMetaData = async ({
  productData,
}: {
  productData: () => Promise<ProductMetadata>;
}): Promise<Metadata> => {
  try {
    const { title, product_pic, description, keywords, siteName, url } =
      await productData();
    return {
      title,
      description,
      keywords: keywords,
      openGraph: {
        title,
        description,
        images: product_pic,
        url: url,
        siteName: siteName,
      },
      twitter: {
        title,
        description,
        images: product_pic,
        card: "summary_large_image",
      },
    };
  } catch (error) {
    return { title: "دکترآباد | محصول" };
  }
};
