import { api } from "@/api/Api";
import DesktopProductSingle from "@/components/layouts/desktop/ProductSingle";
import MobileProductSingle from "@/components/layouts/mobile/ProductSingle";
import { NextPageProps } from "@repo/core/types/general";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { notFound } from "next/navigation";

export default async function Product({
  params,
  searchParams,
}: NextPageProps<{ id: string }>) {
  try {
    const productFetcher = isNaN(Number(params.id))
      ? api.getSingleProductBySlug(params.id)
      : api.getSingleProduct(Number(params.id));

    const { data } = (await productFetcher).data;

    const { data: relatedProductList } = await api.getRelatedProducts(
      Number(data.id),
    );

    return (
      <DiviceSwitchShell
        desktop={
          <DesktopProductSingle
            data={data}
            relatedProductList={relatedProductList.data}
          />
        }
        mobile={
          <MobileProductSingle
            data={data}
            relatedProductList={relatedProductList.data}
            searchParams={searchParams}
          />
        }
      />
    );
  } catch (error) {
    notFound();
  }
}
