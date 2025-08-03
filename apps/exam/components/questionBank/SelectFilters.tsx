"use client";
import {api} from "@/api/Api";
import {QuesTionFilters} from "@/types/filters";
import {SelectQroupItemType} from "@repo/core/types/filter";
import {Apps} from "@repo/core/types/general";
import {SelectFilterQroup} from "@repo/shared_modules/components";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import React from "react";

function SelectFilters() {
  const params = useSearchParams();

  const {data: fieldsData, isLoading: fieldsLoading} = useQuery({
    queryKey: ["question_fields"],
    queryFn: () => api.getQuestionFields(),
  });

  const {data: gradesData, isLoading: gradesLoading} = useQuery({
    queryKey: ["question_grades"],
    queryFn: () =>
      api.getQuestionGrades(
        (params?.get(QuesTionFilters.FIELD) || 1) as number
      ),
    enabled: !!params?.get(QuesTionFilters.FIELD),
  });

  const {data: lessonsData, isLoading: lessonsLoading} = useQuery({
    queryKey: ["question_lessons"],
    queryFn: () =>
      api.getQuestionLessons(
        (params?.get(QuesTionFilters.GRADE) || 1) as number
      ),
    enabled: !!params?.get(QuesTionFilters.GRADE),
  });

  const {data: topicsData, isLoading: topicsLoading} = useQuery({
    queryKey: ["question_topics"],
    queryFn: () =>
      api.getQuestionTopics(
        (params?.get(QuesTionFilters.TOPIC) || 1) as number
      ),
    enabled: !!params?.get(QuesTionFilters.TOPIC),
  });

  const {data: datesData, isLoading: datesLoading} = useQuery({
    queryKey: ["question_dates"],
    queryFn: () =>
      api.getQuestionDates({
        field_id: Number(params?.get(QuesTionFilters.FIELD)) || undefined,
        grade_id: Number(params?.get(QuesTionFilters.GRADE)) || undefined,
        topics: params?.get(QuesTionFilters.TOPIC)
          ? params?.get(QuesTionFilters.TOPIC)?.split(",").map(Number)
          : undefined,
      }),
  });

  const {data: placesData, isLoading: placesLoading} = useQuery({
    queryKey: ["question_places"],
    queryFn: () =>
      api.getQuestionPlaces({
        field_id: Number(params?.get(QuesTionFilters.FIELD)) || undefined,
        grade_id: Number(params?.get(QuesTionFilters.GRADE)) || undefined,
        topics: params?.get(QuesTionFilters.TOPIC)
          ? params?.get(QuesTionFilters.TOPIC)?.split(",").map(Number)
          : undefined,
      }),
  });

  const filters: SelectQroupItemType[] = [
    {
      name: QuesTionFilters.FIELD,
      title: "رشته",
      data:
        fieldsData?.data.data.map((field) => ({
          id: field.id,
          title: field.title,
        })) || [],
      loading: fieldsLoading,
      isActive: true,
      dependencies: [
        QuesTionFilters.GRADE,
        QuesTionFilters.LESSON,
        QuesTionFilters.TOPIC,
      ],
    },
    {
      name: QuesTionFilters.GRADE,
      title: "نام آزمون",
      data:
        gradesData?.data.data.map((grade) => ({
          id: grade.id,
          title: grade.title,
        })) || [],
      loading: gradesLoading,
      isActive: !!params?.get(QuesTionFilters.FIELD),
      dependencies: [QuesTionFilters.LESSON, QuesTionFilters.TOPIC],
    },
    {
      name: QuesTionFilters.LESSON,
      title: "درس",
      data:
        lessonsData?.data.data.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
        })) || [],
      loading: lessonsLoading,
      isActive: !!params?.get(QuesTionFilters.GRADE),
      dependencies: [QuesTionFilters.TOPIC],
    },
    {
      name: QuesTionFilters.TOPIC,
      title: "مبحث",
      data:
        topicsData?.data.data.map((topic) => ({
          id: topic.id,
          title: topic.title,
        })) || [],
      loading: topicsLoading,
      multiSelection: true,
      isActive: !!params?.get(QuesTionFilters.LESSON),
    },
    {
      name: QuesTionFilters.DATE,
      title: "زمان",
      data:
        datesData?.data.data.map((date) => ({
          id: date.id,
          title: date.when,
        })) || [],
      loading: datesLoading,
      multiSelection: true,
      isActive: true,
    },
    {
      name: QuesTionFilters.PLACE,
      title: "مکان",
      data:
        placesData?.data.data.map((place) => ({
          id: place.id,
          title: place.title,
        })) || [],
      loading: placesLoading,
      isActive: true,
      multiSelection: true,
    },
  ];
  return <SelectFilterQroup items={filters} app={Apps.EXAM} />;
}

export default SelectFilters;
