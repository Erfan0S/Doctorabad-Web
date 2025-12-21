"use client";
import { api } from "@/api/Api";
import Loading from "@/components/common/Loading/Loading";
import Questions from "@/components/questions";
import QuestionsLessonsFilter from "@/components/questions/questionsLessonsFilter";
import { QuestionsLessonsFilterProvider } from "@/contexts/questionsLessonFilterContext";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

function MarkedQuestionPageComponent() {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryFn: ({ pageParam }) =>
        api
          .getExamFavoriteQuestionList(Number(pageParam))
          .then((res) => res.data),
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
                key={i}
                isFavorite
                fetchNextPage={fetchNextPage}
              />
            ))}
          </InfiniteScroll>
        </QuestionsLessonsFilterProvider>
      ) : (
        <span
          style={{
            width: "100%",
            textAlign: "center",
            display: "block",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          هیچ سوالی نیست!
        </span>
      )}
    </>
  );
}

function MarkedQuestionPage() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MarkedQuestionPageComponent />
    </QueryClientProvider>
  );
}

export default MarkedQuestionPage;
