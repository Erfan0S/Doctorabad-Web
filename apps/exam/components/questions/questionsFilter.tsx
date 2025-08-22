"use client";
import React from "react";
import Button from "../common/Button/Button";
import SortIcon from "@/assets/svg/sort";
import style from "./questions.module.scss";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { Apps } from "@repo/core/types/general";
import { SelectFilterItems } from "@repo/core/types/filter";

const FiltersItems: SelectFilterItems[] = [
  {
    id: "",
    title: "همه سوالات",
  },
  {
    id: "favorite",
    title: "سوالات مورد علاقه‌",
  },
  {
    id: "explanation",
    title: "‌سوالات پاسخ تشریحی‌دار",
  },
  {
    id: "answered",
    title: "سوالات پاسخ داده شده",
  },
  {
    id: "unanswered",
    title: "سوالات پاسخ داده نشده",
  },
];

function QuestionsFilterButton() {
  const onClickHandler = () => {
    modalActions.addModal(ModalTypes.SELECT_FILTER, {
      title: "چینش سوالات",
      items: FiltersItems,
      queryKey: "filter",
      singleSelection: true,
      app: Apps.EXAM,
    });
  };

  return (
    <Button
      variant="secondary"
      className={style.filterBtn}
      onClick={onClickHandler}
    >
      فیلتر <SortIcon />
    </Button>
  );
}

export default QuestionsFilterButton;
