"use client";
import React from "react";
import { api } from "@/api/Api";
import { FiltersNames, SortType } from "@/types/filters";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  OptionSwitch,
  SelectFilterQroup,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { SelectQroupItemType } from "@repo/core/types/filter";
import { PersistQueryProvider } from "@repo/shared_modules";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";

const FiltersContainer = () => {
  const params = useSearchParams();
  const setSeachParam = useChangeSearchParamsFilter();

  const { data: field, isLoading: fieldLoading } = useQuery({
    queryKey: [FiltersNames.FIELD],
    queryFn: () => api.getFields(),
  });
  const { data: grade, isLoading: gradeLoading } = useQuery({
    queryKey: [FiltersNames.GRADE],
    queryFn: () =>
      api.getGrades((params?.get(FiltersNames.FIELD) || 1) as number),
    enabled: !!params?.get(FiltersNames.FIELD),
  });
  // use static language options instead of calling API
  const languageLoading = false;
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: [FiltersNames.CATEGORY],
    queryFn: () => api.getCategories(),
    enabled: true,
  });
  const { data: subject, isLoading: subjectLoading } = useQuery({
    queryKey: [FiltersNames.SUBJECT],
    queryFn: () =>
      api.getSubjectsByGrade((params?.get(FiltersNames.GRADE) || 1) as number),
    enabled:
      !!params?.get(FiltersNames.FIELD) && !!params?.get(FiltersNames.GRADE),
  });

  const SubjectData = subject?.data.data.map((item : { id: number; title: string }) => ({
    id: item.id,
    title: item.title,
  }));

  const LanguageData = [
    { id: 1, title: "فارسی" },
    { id: 2, title: "انگلیسی" },
    { id: 3, title: "عربی" },
  ];

  const SortData = [
    {
      title: "جدیدترین",
      id: SortType.NEWEST,
    },
    {
      title: "ارزان‌ترین",
      id: SortType.CHEAPEST,
    },
    {
      title: "گران‌ترین",
      id: SortType.EXPENSIVE,
    },
    {
      title: "پرفروش‌ترین",
      id: SortType.BESTSELLING,
    },
    {
      title: "مورد علاقه",
      id: SortType.FAVORITE,
    },
  ];

  const FiltersData: SelectQroupItemType[] = [
    {
      title: "رشته",
      data: field?.data.data || [],
      name: FiltersNames.FIELD,
      loading: fieldLoading,
      isActive: true,
      // changing field should reset dependent academic filters, not category
      dependencies: [FiltersNames.GRADE, FiltersNames.SUBJECT],
    },
    {
      title: "مقطع",
      data: grade?.data.data || [],
      name: FiltersNames.GRADE,
      loading: gradeLoading,
      isActive: !!params?.get(FiltersNames.FIELD),
      dependencies: [FiltersNames.SUBJECT],
    },
    {
      title: "موضوع",
      data: SubjectData || [],
      name: FiltersNames.SUBJECT,
      loading: subjectLoading,
      isActive:
        !!params?.get(FiltersNames.FIELD) && !!params?.get(FiltersNames.GRADE),
    },
    {
      title: "دسته‌بندی",
      data: category?.data.data || [],
      name: FiltersNames.CATEGORY,
      loading: categoryLoading,
      isActive: true,
      multiSelection: true,
    },
    {
      title: "زبان",
      data: LanguageData || [],
      name: FiltersNames.LANGUAGE,
      loading: languageLoading,
      isActive: true,
      multiSelection: true,
    },
    {
      title: "براساس",
      data: SortData,
      name: FiltersNames.SORT,
      loading: false,
      isActive: true,
    },
  ];

  return (
    <div className="card m-2.5 p-[15px] [&>div]:m-0">
      <SelectFilterQroup items={FiltersData} app={Apps.DOWNLOAD} />
      <ul
        style={{
          marginTop: 12,
          marginBottom: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        <OptionSwitch
          title="رایگان!"
          name={FiltersNames.FREE}
          app={Apps.DOWNLOAD}
          isDefaulChecked={params?.get(FiltersNames.FREE) === "1"}
          onToggle={(checked) => {
            setSeachParam({
              [FiltersNames.FREE]: checked ? "1" : "0",
            });
          }}
        />
      </ul>
    </div>
  );
};

const Filters = () => {
  return (
    <PersistQueryProvider>
      <FiltersContainer />
    </PersistQueryProvider>
  );
};

export default Filters;
