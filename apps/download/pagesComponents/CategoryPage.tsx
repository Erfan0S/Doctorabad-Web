import { api } from "@/api/Api";
import { PageHeader } from "@repo/shared_modules/headers";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { Apps } from "@repo/core/types/general";
import Loading from "@/components/common/loading";

type Props = {
  id: number;
};

function CategoryPage({ id }: Props) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["categoryPage", id],
    queryFn: () => api.getFilterList({ page: 1, category: [+id] }),
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
          <PageHeader app={Apps.DOWNLOAD} title="دسته بندی‌ها" />
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
