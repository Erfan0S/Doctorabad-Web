"use client";
import React from "react";
import { SelectFilter } from "./SelectFilter";
import style from "./Filters.module.scss";
import Accordion from "@/components/accordion";
import { modalActions } from "@repo/core";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";

const grade = [
  {
    id: 1,
    title: "پزشکی",
  },
  {
    id: 2,
    title: "دندانپزشکی",
  },
  {
    id: 3,
    title: "داروسازی",
  },
  {
    id: 4,
    title: "پرستاری",
  },
  {
    id: 5,
    title: "مامایی",
  },
  {
    id: 6,
    title: "علوم‌آزمایشگاهی",
  },
  {
    id: 7,
    title: "اتاق‌عمل",
  },
  {
    id: 8,
    title: "فیزیوتراپی",
  },
  {
    id: 9,
    title: "هوشبری",
  },
  {
    id: 12,
    title: "فوریت‌های پزشکی",
  },
  {
    id: 61,
    title: "دامپزشکی",
  },
  {
    id: 62,
    title: "روانشناسی",
  },
];

const Filters = () => {
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
