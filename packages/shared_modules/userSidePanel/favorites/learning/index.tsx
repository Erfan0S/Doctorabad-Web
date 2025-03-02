import React from "react";
import { Loading } from "@repo/shared_modules/components";
import { CourseListItemType } from "@repo/core/types/course";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import CourseList from "./CourseList";
import { PaginatedResponse } from "@repo/core/types/general";

const SidePanelFavoritesLearning: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PaginatedResponse<CourseListItemType[]>
  >({
    queryFn: ({ pageParam }) =>
      api.getLearnFavoriteList(Number(pageParam)).then((res) => res.data),
    queryKey: ["favorite", "learning"],
    initialPageParam: 1,
    staleTime: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  if (isLoading) return <Loading size={22} />;

  return (
    <CourseList
      courses={data}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default SidePanelFavoritesLearning;
