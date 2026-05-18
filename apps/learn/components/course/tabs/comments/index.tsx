// @ts-nocheck
"use client";

import { ProductComments as ProductCommentType } from "@repo/core/types/product";
import style from "./ProductComments.module.scss";
import ProductCommentsForm from "./form";
import ProductCommentsList from "./list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { Loading } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { CourseContentProps } from "../tabs-data";

const CourseComments: React.FC<CourseContentProps> = ({ course }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ProductCommentType>({
      queryKey: ["comments", course.id],
      initialPageParam: 1,
      staleTime: Infinity,
      queryFn: ({ pageParam }) =>
        api
          .getCommentsList(course.id, Number(pageParam))
          .then((res) => res.data),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.data.length === 0) {
          return undefined;
        }
        return (lastPageParam as number) + 1;
      },
    });

  if (isLoading) return <Loading size={10} app={Apps.LEARN} />;

  return (
    <div className={style.productComments}>
      <ProductCommentsForm courseId={course.id} />
      <ProductCommentsList
        comments={data!}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default CourseComments;
