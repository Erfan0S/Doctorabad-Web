"use client";
import { api } from "@/api/Api";
import useGetFilterParams from "@/hooks/useGetQuestionParams";
import { Apps } from "@repo/core/types/general";
import { SearchInput } from "@repo/shared_modules/ui";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function QuestionSearchInpt() {
  const params = useGetFilterParams();
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

  const { data, isLoading } = useQuery({
    queryKey: ["questionCount", params],
    queryFn: () =>
      api.getQestionCount({
        field: Number(field) || undefined,
        budgeting: Number(budgeting) || undefined,
        dates: date?.split(",").map(Number),
        grade: Number(grade) || undefined,
        lesson: Number(lesson) || undefined,
        places: place?.split(",").map(Number),
        tip: tip ? "1" : undefined,
        title: query || undefined,
        topics: topics?.split(",").map(Number),
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
