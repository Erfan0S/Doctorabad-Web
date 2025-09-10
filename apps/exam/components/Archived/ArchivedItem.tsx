import { SelectQroupItemType } from "@repo/core/types/filter";
import { Apps } from "@repo/core/types/general";
import { SelectFilterQroup } from "@repo/shared_modules/components";
import React, { useState } from "react";
import style from "./archived.module.scss";
import Button from "../common/Button/Button";
import { formatTimeJ } from "@repo/core/utils/formatTime";
import { api } from "@/api/Api";
import { toast } from "react-toastify";
import Loading from "../common/Loading/Loading";
import { useRouter } from "next/navigation";
import { filtersNames } from "@/constants/filters";
import { RoutePath } from "@/constants/routPaths";

type Props = {
  data: ArchivedType;
};

interface filtersItemType extends SelectQroupItemType {
  id?: string | number;
}

function ArchivedItem({ data }: Props) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  const FiltersNames = filtersNames("questionBank");

  let filters: filtersItemType[] = [
    {
      name: FiltersNames.FIELD,
      id: data.field,
      title: "رشته",
      data: [{ id: data.field, title: data.field_title }],
      loading: false,
      isActive: false,
      initialTitle: data.field_title,
    },
    {
      name: FiltersNames.GRADE,
      id: data.grade,
      title: "نام آزمون",
      data: [],
      loading: false,
      isActive: false,
      initialTitle: data.grade_title || "انتخاب نشده",
    },
    {
      name: FiltersNames.LESSON,
      id: data.lesson,
      title: "درس",
      data: [],
      loading: false,
      isActive: false,
      initialTitle: data.lesson_title || "انتخاب نشده",
    },
    {
      name: FiltersNames.TOPIC,
      id: data.topic?.map((topic) => topic.id).join(","),
      title: "مبحث",
      data: [],
      loading: false,
      multiSelection: true,
      isActive: false,
      initialTitle: data.topic
        ? data.topic?.map((topic) => topic.title).join(",")
        : "انتخاب نشده",
    },
    {
      name: FiltersNames.DATE,
      id: data.date?.map((date) => date.id).join(","),
      title: "زمان",
      data: [],
      loading: false,
      multiSelection: true,
      isActive: false,
      initialTitle: data.date
        ? data.date
            ?.map((date) => formatTimeJ(date.title, "jMMMM jYYYY"))
            .join(",")
        : "انتخاب نشده",
    },
    {
      name: FiltersNames.PLACE,
      id: data.place?.map((place) => place.id).join(","),
      title: "مکان",
      data: [],
      loading: false,
      isActive: false,
      multiSelection: true,
      initialTitle: data.place
        ? data.place?.map((place) => place.title).join(",")
        : "انتخاب نشده",
    },
  ];

  const deleteHandler = () => {
    setDeleteLoading(true);
    api
      .deleteArchived(data.id)
      .then(() => {
        toast("آزمون با موفقیت حذف شد", { type: "success" });
      })
      .catch(() => {
        toast("خطایی رخ داده است", { type: "error" });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  const onFilterHandler = () => {
    const params = new URLSearchParams();
    filters.forEach((filter) => {
      filter.name &&
        filter.id &&
        params.append(filter.name, filter.id.toString());
    });
    if (data.title) {
      params.append("q", data.title);
    }
    if (data.budgeting) {
      params.append(FiltersNames.BUDGETING, data.budgeting.toString());
    }
    if (data.tip) {
      params.append(FiltersNames.TIP, data.tip.toString());
    }

    router.push(`${RoutePath.questions}?${params.toString()}`);
  };

  return (
    <div className={`${style.archivedItemWrapper} card`}>
      <SelectFilterQroup dontHaveQuery items={filters} app={Apps.EXAM} />
      {!!data.title && <p>عبات جست و جو شده: {data.title}</p>}
      <div className={style.archivedItemFooter}>
        <span>{formatTimeJ(data.created_at)}</span>
        <div>
          <Button onClick={deleteHandler} variant="danger">
            {deleteLoading ? <Loading /> : "حذف"}
          </Button>
          <Button onClick={onFilterHandler}>فیلتر کن و نشون بده!</Button>
        </div>
      </div>
    </div>
  );
}

export default ArchivedItem;
