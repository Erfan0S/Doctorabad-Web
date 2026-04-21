"use client";

import {
  ProductComments as ProductCommentType,
  SingleProduct,
} from "@repo/core/types/product";
import style from "./ProductComments.module.scss";
import ProductCommentsForm from "./form";
import ProductCommentsHeader from "./header";
import ProductCommentsList from "./list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import Loading from "@/components/common/loading";
interface Props {
  productData: SingleProduct;
}
const ProductComments: React.FC<Props> = ({ productData }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ProductCommentType>({
      queryKey: ["comments", productData.id],
      initialPageParam: 1,
      staleTime: Infinity,
      queryFn: ({ pageParam }) =>
        api
          .getCommentsList(productData.id, Number(pageParam))
          .then((res) => res.data),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.data.length === 0) {
          return undefined;
        }
        return (lastPageParam as number) + 1;
      },
    });

  if (isLoading) return <Loading size={10} />;

  return (
    <div className={style.productComments}>
      <ProductCommentsHeader
        averageRating={Number(Number(data!.pages[0].rate).toFixed(1))}
        totalRating={data!.pages[0].rate_count}
      />
      <ProductCommentsForm productId={productData.id} userRating={3} />
      <ProductCommentsList
        comments={data!}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default ProductComments;
