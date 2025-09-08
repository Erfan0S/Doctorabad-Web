import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  Questions,
  QuestionsLessonsFilter,
  examApi,
} from "@repo/apps_shared_components";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "../../../common/components";

const SidePanelFavoritesExam: React.FC = () => {
  examApi.getExamFavoriteList().then((res) => console.log(res));
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      examApi.getExamFavoriteList(Number(pageParam)).then((res) => res.data),
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

  if (isLoading) return <Loading />;

  return (
    <>
      <QuestionsLessonsFilter lessons={data?.pages[0].lessons || []} />
      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading />}
      >
        {data?.pages.map((questions, i) => (
          <Questions questions={questions.data} mobileMode />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default SidePanelFavoritesExam;
