"use client";
import { api } from "@/api/Api";
import { ExamTopicType } from "@/types/exam";
import { QuesTionFilters } from "@/types/filters";
import {
  SelectFilterItems,
  SelectQroupItemType,
} from "@repo/core/types/filter";
import { Apps } from "@repo/core/types/general";
import { SelectFilterQroup } from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function SelectFilters() {
  const params = useSearchParams();

  const fieldParam = params?.get(QuesTionFilters.FIELD);
  const gradeParam = params?.get(QuesTionFilters.GRADE);
  const lessonParam = params?.get(QuesTionFilters.LESSON);
  const topicParam = params?.get(QuesTionFilters.TOPIC);

  const topicData = (topics: ExamTopicType[]): SelectFilterItems[] => {
    if (!topics.length) return [];
    return topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      childern: !!topic.topics.length ? topicData(topic.topics) : [],
    }));
  };

  const { data: fieldsData, isLoading: fieldsLoading } = useQuery({
    queryKey: ["question_fields"],
    queryFn: () => api.getQuestionFields(),
  });

  const { data: gradesData, isLoading: gradesLoading } = useQuery({
    queryKey: ["question_grades", fieldParam],
    queryFn: () => api.getQuestionGrades((fieldParam || 1) as number),
    enabled: !!fieldParam,
  });

  const { data: lessonsData, isLoading: lessonsLoading } = useQuery({
    queryKey: ["question_lessons", gradeParam],

    queryFn: () => api.getQuestionLessons((gradeParam || 1) as number),
    enabled: !!gradeParam,
  });

  const { data: topicsData, isLoading: topicsLoading } = useQuery({
    queryKey: ["question_topics", lessonParam],
    queryFn: () => api.getQuestionTopics((lessonParam || 1) as number),
    enabled: !!lessonParam,
  });

  const { data: datesData, isLoading: datesLoading } = useQuery({
    queryKey: ["question_dates", gradeParam, topicParam, fieldParam],
    queryFn: () =>
      api.getQuestionDates({
        field_id: Number(fieldParam) || undefined,
        grade_id: Number(gradeParam) || undefined,
        topics: topicParam ? topicParam?.split(",").map(Number) : undefined,
      }),
  });

  const { data: placesData, isLoading: placesLoading } = useQuery({
    queryKey: ["question_places", gradeParam, topicParam, fieldParam],
    queryFn: () =>
      api.getQuestionPlaces({
        field_id: Number(fieldParam) || undefined,
        grade_id: Number(gradeParam) || undefined,
        topics: topicParam ? topicParam?.split(",").map(Number) : undefined,
      }),
  });

  // useEffect(() => {
  //   console.log(topicData);
  // }, [topicData]);

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
      isActive: !!fieldParam,
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
      isActive: !!gradeParam,
      dependencies: [QuesTionFilters.TOPIC],
    },
    {
      name: QuesTionFilters.TOPIC,
      title: "مبحث",
      data: topicData(topicsData?.data.data || []),

      loading: topicsLoading,
      multiSelection: true,
      isActive: !!lessonParam,
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

  // api.getQuestionTopics(1).then((res) => {
  //   console.log(res);
  // });
  return <SelectFilterQroup items={filters} app={Apps.EXAM} />;
}

export default SelectFilters;
