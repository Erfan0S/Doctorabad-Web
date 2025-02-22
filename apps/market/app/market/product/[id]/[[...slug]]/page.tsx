import { api } from "@/api/Api";
import ProductIntro from "@/components/product/intro";
import ProductSidebar from "@/components/product/sidebar";
import ProductTabs from "@/components/product/tabs";
import { NextPageProps } from "@repo/core/types/general";

export default async function Product({
  params,
}: NextPageProps<{ id: string }>) {
  const productFetcher = isNaN(Number(params.id))
    ? api.getSingleProductBySlug(params.id)
    : api.getSingleProduct(Number(params.id));

  const { data } = (await productFetcher).data;

  const { data: relatedProductList } = await api.getRelatedProducts(
    Number(data.id)
  );

  return (
    <>
      <div className="col-xl-8">
        <ProductIntro productData={data} />
        <ProductTabs
          productData={data}
          relatedProductList={relatedProductList.data}
        />
      </div>
      <div className="col-xl-4 d-none d-xl-block">
        <ProductSidebar product={data} />
      </div>
    </>
  );
}
