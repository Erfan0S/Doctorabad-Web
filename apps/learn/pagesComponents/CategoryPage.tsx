import { api } from "@/api/Api";
import PageHeader from "@/components/Header/PageHeader";
import { Loading } from "@repo/shared_modules/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  id: number;
};

function CategoryPage({ id }: Props) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["categoryPage", id],
    queryFn: () => api.getFilterList({ page: 1, categories: +id }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.meta.current_page + 1;
      return nextPage <= lastPage.data.meta.last_page ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PageHeader title="دسته بندی‌ها" />
          {/* <CourseList
            courses={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          /> */}
        </>
      )}
    </div>
  );
}

export default CategoryPage;
