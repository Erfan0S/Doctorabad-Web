"use client";
import React from "react";
import Button from "../common/Button/Button";
import SortIcon from "@/assets/svg/sort";
import style from "./questions.module.scss";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { Apps } from "@repo/core/types/general";
import { SelectFilterItems } from "@repo/core/types/filter";
import { useSearchParams } from "next/navigation";
import {
  QuestionListFilters,
  QuestionListFiltersKey,
} from "@/types/questionListFilters";

const FiltersItems: SelectFilterItems[] = [
  {
    id: "",
    title: "همه سوالات",
  },
  {
    id: QuestionListFilters.FAVORITE,
    title: "سوالات مورد علاقه‌",
  },
  {
    id: QuestionListFilters.HAVE_EXPLANATION,
    title: "‌سوالات پاسخ تشریحی‌دار",
  },
  {
    id: QuestionListFilters.ANSWERED,
    title: "سوالات پاسخ داده شده",
  },
  {
    id: QuestionListFilters.NOT_ANSWERED,
    title: "سوالات پاسخ داده نشده",
  },
];

function QuestionsFilterButton() {
  const searchParams = useSearchParams();

  const questionFilter = searchParams?.get(QuestionListFiltersKey);

  const onClickHandler = () => {
    modalActions.addModal(ModalTypes.SELECT_FILTER, {
      title: "چینش سوالات",
      items: FiltersItems,
      queryKey: QuestionListFiltersKey,
      singleSelection: true,
      app: Apps.EXAM,
    });
  };

  const currectFilter =
    FiltersItems.find((filter) => filter.id === questionFilter) ||
    FiltersItems[0];

  return (
    <Button
      variant="secondary"
      className={style.filterBtn}
      onClick={onClickHandler}
    >
      {currectFilter.title || "فیلتر"} <SortIcon />
    </Button>
  );
}

export default QuestionsFilterButton;
