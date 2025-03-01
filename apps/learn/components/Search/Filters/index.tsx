"use client";
import React, { useEffect } from "react";
import style from "./Filters.module.scss";
import Accordion from "@/components/accordion";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { api } from "@/api/Api";
import { FiltersNames, SortType } from "@/types/filters";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const Filters = () => {
  const params = useSearchParams();

  const { data: field, isLoading: fieldLoading } = useQuery({
    queryKey: [FiltersNames.FIELD],
    queryFn: () => api.getFields(2),
  });
  const { data: grade, isLoading: gradeLoading } = useQuery({
    queryKey: [FiltersNames.GRADE],
    queryFn: () =>
      api.getGrades(2, (params?.get(FiltersNames.FIELD) || 1) as number),
    enabled: !!params?.get(FiltersNames.FIELD),
  });
  const { data: language, isLoading: languageLoading } = useQuery({
    queryKey: [FiltersNames.LANGUAGE],
    queryFn: () => api.getLanguages(),
    enabled: true,
  });
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: [FiltersNames.CATEGORY],
    queryFn: () =>
      api.getCategoriesByGrade(+(params?.get(FiltersNames.GRADE) || 1)),
    enabled:
      !!params?.get(FiltersNames.FIELD) && !!params?.get(FiltersNames.GRADE),
  });
  const { data: provider, isLoading: providerLoading } = useQuery({
    queryKey: [FiltersNames.PROVIDER],
    queryFn: () => api.getProviders(),
  });

  const ProviderData = provider?.data.data.map((item) => ({
    id: item.id,
    title: item.name,
  }));

  const LanguageData = language?.data.map((item) => ({
    id: item.id,
    title: item.language,
  }));

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

  const FiltersData = [
    {
      title: "رشته",
      data: field?.data.data || [],
      name: FiltersNames.FIELD,
      loading: fieldLoading,
      isActive: true,
    },
    {
      title: "مقطع",
      data: grade?.data.data || [],
      name: FiltersNames.GRADE,
      loading: gradeLoading,
      isActive: !!params?.get(FiltersNames.FIELD),
    },
    {
      title: "موضوع",
      data: category?.data.data || [],
      name: FiltersNames.CATEGORY,
      loading: categoryLoading,
      isActive:
        !!params?.get(FiltersNames.FIELD) && !!params?.get(FiltersNames.GRADE),
    },
    {
      title: "ارائه‌دهنده",
      data: ProviderData,
      name: FiltersNames.PROVIDER,
      loading: providerLoading,
      isActive: true,
    },
    {
      title: "زبان",
      data: LanguageData,
      name: FiltersNames.LANGUAGE,
      loading: languageLoading,
      isActive: true,
    },
    {
      title: "براساس",
      data: SortData,
      name: FiltersNames.SORT,
      loading: false,
      isActive: true,
    },
  ];

  useEffect(() => {
    FiltersData.forEach((filter) => {
      console.log(filter.title, filter.loading);
    });
  }, [FiltersData]);

  return (
    <div className={style.filters}>
      {FiltersData.map((filter, index) => (
        <Accordion
          className={style.filtersAccordion}
          title={filter.title}
          items={filter.data || []}
          queryKey={filter.name}
          singleSelection={true}
          isActive={!filter.loading && filter.isActive}
        />
      ))}
    </div>
  );
};

export default Filters;
