import React, { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  Questions,
  QuestionsLessonsFilter,
  examApi,
} from "@repo/apps_shared_components";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "../../../common/components";
import { QuestionsLessonsFilterProvider } from "@repo/apps_shared_components/exam";

const SidePanelFavoritesExam: React.FC = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryFn: ({ pageParam }) =>
        examApi.getExamFavoriteList(Number(pageParam)).then((res) => res.data),
      queryKey: ["favorite", "exam"],
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (!!lastPage.links.next) {
          return (lastPageParam as number) + 1;
        }
        return undefined;
      },
      staleTime: 0,
      gcTime: 0,
    });

  const hasQuestions = !!data?.pages[0].lessons.length;

  if (isLoading) return <Loading />;

  return (
    <>
      {hasQuestions ? (
        <QuestionsLessonsFilterProvider>
          <QuestionsLessonsFilter lessons={data?.pages[0].lessons || []} />
          <InfiniteScroll
            pageStart={1}
            loadMore={() => {
              fetchNextPage();
            }}
            useWindow={false}
            hasMore={hasNextPage}
            loader={<Loading />}
            getScrollParent={() =>
              document.getElementById("favoriteListContainer") as HTMLElement
            }
          >
            {data?.pages.map((questions, i) => (
              <Questions
                questions={questions.data}
                mobileMode
                key={i}
                isFavorite
                fetchNextPage={fetchNextPage}
              />
            ))}
          </InfiniteScroll>
        </QuestionsLessonsFilterProvider>
      ) : (
        <span style={{ width: "100%", textAlign: "center", display: "block" }}>
          هیچ سوالی نیست!
        </span>
      )}
    </>
  );
};

export default SidePanelFavoritesExam;
