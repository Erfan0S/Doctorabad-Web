// @ts-nocheck
"use client";

import { ProductComments as ProductCommentType } from "@repo/core/types/product";
import ProductCommentsForm from "./form";
import ProductCommentsList from "./list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { Loading } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { PackageContentProps } from "../tabs-data";

const PackageComments: React.FC<PackageContentProps> = ({ packageItem }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ProductCommentType>({
      queryKey: ["package_comments", packageItem.id],
      initialPageParam: 1,
      staleTime: Infinity,
      queryFn: ({ pageParam }) =>
        api
          .getPackageCommentsList(packageItem.id, Number(pageParam))
          .then((res) => res.data),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.data.length === 0) {
          return undefined;
        }
        return (lastPageParam as number) + 1;
      },
    });

  if (isLoading) return <Loading size={10} app={Apps.DOWNLOAD} />;

  return (
    <div>
      <ProductCommentsForm packageId={packageItem.id} />
      <ProductCommentsList
        comments={data!}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default PackageComments;
