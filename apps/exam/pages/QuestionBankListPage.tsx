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
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import BudgetingRecord from "@/components/exam/BudgetingRecord";
import { PreventContext } from "@repo/shared_modules/components";
import ExamFIlterNotFound from "@repo/apps_shared_components/exam/components/common/FIlterNotFound/index.tsx";
import { PersistQueryProvider } from "@repo/shared_modules";
import { QuestionsAnswersContext } from "@repo/apps_shared_components/exam/contexts/questionsAnswersContext.tsx";
import { QuestionType } from "@repo/apps_shared_components/exam/types/exam.ts";

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

  const questionFilter = searcParams?.get(QuestionListFiltersKey) as
    | QuestionListFilters
    | undefined;
  const { answers } = useContext(QuestionsAnswersContext);

  const { data, isLoading, fetchNextPage, hasNextPage, status } =
    useInfiniteQuery({
      queryKey: [
        "auth",
        "questionBankList",
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
        questionFilter === QuestionListFilters.HAVE_EXPLANATION,
        questionFilter === QuestionListFilters.FAVORITE,
      ],

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
  const [emptyPageCount, setEmptyPageCount] = useState(0);

  const filterQuestions = (questions: QuestionType[]) => {
    if (
      questionFilter &&
      (questionFilter === QuestionListFilters.ANSWERED ||
        questionFilter === QuestionListFilters.NOT_ANSWERED)
    ) {
      const filtredQuestions = questions.filter((question) => {
        switch (questionFilter) {
          case QuestionListFilters.ANSWERED:
            return !!answers[question.id]?.userAnswer;
          case QuestionListFilters.NOT_ANSWERED:
            return !answers[question.id]?.userAnswer;
          default:
            return questions;
        }
      });
      return filtredQuestions;
    } else {
      return questions;
    }
  };

  useEffect(() => {
    console.log("haveFullPage", emptyPageCount);
  }, [emptyPageCount]);

  if (
    (!data?.pages[0].data.length || emptyPageCount === data.pages.length) &&
    !!status &&
    status !== "pending" &&
    !isLoading
  )
    return <ExamFIlterNotFound />;

  return (
    <div>
      <PreventContext />
      {(!!isLoading || status === "pending") && <Loading />}

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
        loader={<Loading key="loading" haveMargin />}
      >
        {data?.pages.map((questions, i) => {
          const filteredQuestions = filterQuestions(questions.data);

          // if (!filteredQuestions.length) {
          //   setEmptyPageCount((prev) => prev + 1);
          //   return null;
          // }else {
          //   setEmptyPageCount(0);
          // }

          return (
            <Questions
              questions={filteredQuestions}
              key={i}
              total={data.pages[0].meta.total}
              startIndex={data.pages[0].meta.per_page * i}
            />
          );
        })}
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
