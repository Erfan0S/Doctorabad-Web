"use client";
import { api } from "@/api/Api";
import { filtersNames } from "@/constants/filters";
import { ExamTopicType } from "@/types/exam";
import { filterPages } from "@/types/filters";
import {
  SelectFilterItems,
  SelectQroupItemType,
} from "@repo/core/types/filter";
import { Apps } from "@repo/core/types/general";
import { SelectFilterQroup } from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  page: filterPages;
  isExamList?: boolean;
};

function SelectFilters({ page, isExamList }: Props) {
  const FiltersNames = filtersNames(page);

  const params = useSearchParams();

  const fieldParam = params?.get(FiltersNames.FIELD);
  const gradeParam = params?.get(FiltersNames.GRADE);
  const lessonParam = params?.get(FiltersNames.LESSON);
  const topicParam = params?.get(FiltersNames.TOPIC);

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
    queryFn: () => (isExamList ? api.getExamFields() : api.getQuestionFields()),
  });

  const { data: gradesData, isLoading: gradesLoading } = useQuery({
    queryKey: ["question_grades", fieldParam],
    queryFn: () =>
      isExamList
        ? api.getExamGrades((fieldParam || 1) as number)
        : api.getQuestionGrades((fieldParam || 1) as number),
    enabled: !!fieldParam,
  });

  const { data: lessonsData, isLoading: lessonsLoading } = useQuery({
    queryKey: ["question_lessons", gradeParam],

    queryFn: () => api.getQuestionLessons((gradeParam || 1) as number),
    enabled: !!gradeParam && !isExamList,
  });

  const { data: topicsData, isLoading: topicsLoading } = useQuery({
    queryKey: ["question_topics", lessonParam],
    queryFn: () => api.getQuestionTopics((lessonParam || 1) as number),
    enabled: !!lessonParam && !isExamList,
  });

  const { data: datesData, isLoading: datesLoading } = useQuery({
    queryKey: ["question_dates", gradeParam, topicParam, fieldParam],
    queryFn: () =>
      isExamList
        ? api.getExamDates(
            Number(fieldParam) || undefined,
            Number(gradeParam) || undefined
          )
        : api.getQuestionDates({
            field_id: Number(fieldParam) || undefined,
            grade_id: Number(gradeParam) || undefined,
            topics: topicParam ? topicParam?.split(",").map(Number) : undefined,
          }),
  });

  const { data: placesData, isLoading: placesLoading } = useQuery({
    queryKey: ["question_places", gradeParam, topicParam, fieldParam],
    queryFn: () =>
      isExamList
        ? api.getExamPlaces(
            Number(fieldParam) || undefined,
            Number(gradeParam) || undefined
          )
        : api.getQuestionPlaces({
            field_id: Number(fieldParam) || undefined,
            grade_id: Number(gradeParam) || undefined,
            topics: topicParam ? topicParam?.split(",").map(Number) : undefined,
          }),
  });

  let filters: SelectQroupItemType[] = [
    {
      name: FiltersNames.FIELD,
      title: "رشته",
      data:
        fieldsData?.data.data.map((field) => ({
          id: field.id,
          title: field.title,
        })) || [],
      loading: fieldsLoading,
      isActive: true,
      dependencies: [
        FiltersNames.GRADE,
        FiltersNames.LESSON,
        FiltersNames.TOPIC,
      ],
    },
    {
      name: FiltersNames.GRADE,
      title: "نام آزمون",
      data:
        gradesData?.data.data.map((grade) => ({
          id: grade.id,
          title: grade.title,
        })) || [],
      loading: gradesLoading,
      isActive: !!fieldParam,
      dependencies: [FiltersNames.LESSON, FiltersNames.TOPIC],
    },
    {
      name: FiltersNames.LESSON,
      title: "درس",
      data:
        lessonsData?.data.data.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
        })) || [],
      loading: lessonsLoading,
      isActive: !!gradeParam,
      dependencies: [FiltersNames.TOPIC],
    },
    {
      name: FiltersNames.TOPIC,
      title: "مبحث",
      data: topicData(topicsData?.data.data || []),

      loading: topicsLoading,
      multiSelection: true,
      isActive: !!lessonParam,
    },
    {
      name: FiltersNames.DATE,
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
      name: FiltersNames.PLACE,
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

  if (isExamList) {
    filters = filters.filter((filter) => {
      return (
        filter.name !== FiltersNames.LESSON &&
        filter.name !== FiltersNames.TOPIC
      );
    });
  }
  return <SelectFilterQroup items={filters} app={Apps.EXAM} />;
}

export default SelectFilters;
