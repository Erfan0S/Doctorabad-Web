import { api } from "@/api/Api";
import Loading from "@/components/common/Loading/Loading";
import useGetFilterParams from "@/hooks/useGetQuestionParams";
import { Questions } from "@repo/apps_shared_components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

function QuestionBankListPage() {
  const {
    budgeting,
    date,
    explanation,
    field,
    grade,
    lesson,
    place,
    query,
    tip,
    topics,
  } = useGetFilterParams();
  const searcParams = useSearchParams();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["questionBankList", searcParams],

    queryFn: ({ pageParam }) =>
      api
        .getQuestions({
          field: field || 1,
          grade: grade || undefined,
          budgeting: budgeting || undefined,
          dates: date?.split(",") || undefined,
          lesson: lesson || undefined,
          places: place?.split(",") || undefined,
          title: query || undefined,
          topics: topics?.split(",") || undefined,
          tip: tip || undefined,
          page: pageParam,
        })
        .then((res) => res.data),
    initialPageParam: 1,
    staleTime: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.links.next) {
        return (lastPageParam as number) + 1;
      }
      return undefined;
    },
  });

  if (!data?.pages.length && !isLoading) return <div>موردی یافت نشد</div>;

  return (
    <div>
      {!!isLoading && <Loading />}
      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loading />}
      >
        {data?.pages.map((questions, i) => (
          <Questions questions={questions.data} key={i} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default QuestionBankListPage;
