"use client";
import React, { useEffect, useState } from "react";
import { SelectFilter } from "./SelectFilter";
import style from "./Filters.module.scss";
import Accordion from "@/components/accordion";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { api } from "@/api/Api";
import { SortType } from "@/types/filters";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { CourseListConfigs } from "@/constants/CourseList";

const FiltersConfigs = {
  field: {
    title: "رشته",
    name: "field",
    api: api.getFields,
  },
  grade: {
    title: "مقطع",
    name: "grade",
    api: api.getGrades,
  },
  language: {
    title: "زبان",
    name: "language",
    api: api.getLanguages,
  },
  category: {
    title: "موضوع",
    name: "category",
    api: api.getCategories,
  },
  provider: {
    title: "مدرس",
    name: "provider",
    api: api.getProviders,
  },
  sort: {
    title: "براساس",
    name: "sort",
    data: SortType,
  },
};

const Filters = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const params = useSearchParams();

  useEffect(() => {
    params?.forEach((value, key) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    });
  }, [params]);

  const { data: field } = useQuery({
    queryKey: ["field"],
    queryFn: () => FiltersConfigs.field.api(2),
  });
  const { data: grade } = useQuery({
    queryKey: ["grade"],
    queryFn: () =>
      FiltersConfigs.grade.api(2, (params?.get("grade") || 1) as number),
    enabled: !!params?.get(FiltersConfigs.field.name),
  });
  const { data: language } = useQuery({
    queryKey: ["language"],
    queryFn: () => FiltersConfigs.language.api(),
    enabled: true,
  });
  const { data: category } = useQuery({
    queryKey: ["category"],
    queryFn: () => FiltersConfigs.category.api(),
    enabled: true,
  });
  const { data: provider } = useQuery({
    queryKey: ["provider"],
    queryFn: () => FiltersConfigs.provider.api(),
  });
  const sort = FiltersConfigs.sort.data;

  return (
    <div className={style.filters}>
      <Accordion
        className={style.filtersAccordion}
        title="رشته"
        onClick={() =>
          modalActions.addModal(ModalTypes.SELECT_FILTER, {
            title: "رشته",
            items: grade,
            queryKey: "field_grade",
          })
        }
      />
      <Accordion
        className={style.filtersAccordion}
        title="رشته"
        onClick={() =>
          modalActions.addModal(ModalTypes.SELECT_FILTER, {
            title: "رشته",
            items: grade,
            queryKey: "field_grade",
          })
        }
      />{" "}
      <Accordion
        className={style.filtersAccordion}
        title="رشته"
        onClick={() =>
          modalActions.addModal(ModalTypes.SELECT_FILTER, {
            title: "رشته",
            items: grade,
            queryKey: "field_grade",
          })
        }
      />{" "}
      <Accordion
        className={style.filtersAccordion}
        title="رشته"
        onClick={() =>
          modalActions.addModal(ModalTypes.SELECT_FILTER, {
            title: "رشته",
            items: grade,
            queryKey: "field_grade",
          })
        }
      />{" "}
      <Accordion
        className={style.filtersAccordion}
        title="رشته"
        onClick={() =>
          modalActions.addModal(ModalTypes.SELECT_FILTER, {
            title: "رشته",
            items: grade,
            queryKey: "field_grade",
          })
        }
      />{" "}
      <Accordion
        className={style.filtersAccordion}
        title="رشته"
        onClick={() =>
          modalActions.addModal(ModalTypes.SELECT_FILTER, {
            title: "رشته",
            items: grade,
            queryKey: "field_grade",
          })
        }
      />
    </div>
  );
};

export default Filters;
