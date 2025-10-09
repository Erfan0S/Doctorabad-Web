import { api } from "@/api/Api";
import Loading from "@/components/common/Loading/Loading";
import useGetFilterParams from "@/hooks/useGetQuestionParams";
import {
  QuestionListFilters,
  QuestionListFiltersKey,
} from "@repo/apps_shared_components/exam/types/questionListFilters.ts";
import { Questions } from "@repo/apps_shared_components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import BudgetingRecord from "@/components/exam/BudgetingRecord";
import { PreventContext } from "@repo/shared_modules/components";
import FIlterNotFound from "@/components/common/FIlterNotFound";
import { PersistQueryProvider } from "@repo/shared_modules";

function QuestionBankListPageComponent() {
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

  const questionFilter = searcParams?.get(QuestionListFiltersKey);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["questionBankList", searcParams, questionFilter],

    queryFn: ({ pageParam }) =>
      api
        .getQuestions({
          field: Number(field) || 1,
          grade: Number(grade) || undefined,
          budgeting: Number(budgeting) || undefined,
          dates: date?.split(",").map(Number) || undefined,
          lesson: Number(lesson) || undefined,
          places: place?.split(",").map(Number) || undefined,
          title: query || undefined,
          topics: topics?.split(",").map(Number) || undefined,
          tip: Number(tip) || undefined,
          explanation:
            questionFilter === QuestionListFilters.HAVE_EXPLANATION
              ? 1
              : undefined,
          favorite:
            questionFilter === QuestionListFilters.FAVORITE ? 1 : undefined,
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

  if (!data?.pages[0].data.length && !isLoading) return <FIlterNotFound />;

  return (
    <div>
      <PreventContext />
      {!!isLoading && <Loading />}

      {!!budgeting && !!data?.pages[0].budgeting.length && (
        <BudgetingRecord
          budgets={data?.pages[0].budgeting}
          title={data?.pages[0].data[0].lesson}
          total={data?.pages[0].meta.total}
        />
      )}

      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage && questionFilter !== QuestionListFilters.ANSWERED}
        loader={<Loading />}
      >
        {data?.pages.map((questions, i) => (
          <Questions
            questions={questions.data}
            key={i}
            total={data.pages[0].meta.total}
            startIndex={data.pages[0].meta.per_page * i}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

function QuestionBankListPage() {
  return (
    <PersistQueryProvider>
      <QuestionBankListPageComponent />
    </PersistQueryProvider>
  );
}

export default QuestionBankListPage;
