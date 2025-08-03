"use client";
import {api} from "@/api/Api";
import useGetQuestionParams from "@/hooks/useGetQuestionParams";
import {Apps} from "@repo/core/types/general";
import SearchInput from "@repo/shared_modules/ui/SearchInput/index";
import {useQuery} from "@tanstack/react-query";
import React from "react";

function QuestionSearchInpt() {
  const params = useGetQuestionParams();
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
  } = params;

  const {data, isLoading} = useQuery({
    queryKey: ["questionCount", params],
    queryFn: () =>
      api.getQestionCount({
        field: field || undefined,
        budgeting: budgeting || undefined,
        dates: date?.split(","),
        grade: grade || undefined,
        lesson: lesson || undefined,
        places: place?.split(","),
        tip: tip ? "1" : undefined,
        title: query || undefined,
        topics: topics?.split(","),
      }),
  });

  return (
    <SearchInput
      app={Apps.EXAM}
      placeholder={`بین ${isLoading ? "..." : data?.data.data.count} سوال جستجو کن!`}
    />
  );
}

export default QuestionSearchInpt;
