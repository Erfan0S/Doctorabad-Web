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
import { RoutePath } from "@/constants/routPaths";
import { SharedFilters } from "@repo/apps_shared_components/exam/types/filters.ts";

type Props = {
  data: ArchivedType;
};

interface filtersItemType extends SelectQroupItemType {
  id?: string | number;
}

function ArchivedItem({ data }: Props) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();

  let filters: filtersItemType[] = [
    {
      name: SharedFilters.FIELD,
      id: data.field,
      title: data.field_title,
      data: [{ id: data.field, title: data.field_title }],
      loading: false,
      isActive: false,
    },
    {
      name: SharedFilters.GRADE,
      id: data.grade,
      title: data.grade_title || "انتخاب نشده",
      data: [],
      loading: false,
      isActive: false,
    },
    {
      name: SharedFilters.LESSON,
      id: data.lesson,
      title: data.lesson_title || "انتخاب نشده",
      data: [],
      loading: false,
      isActive: false,
    },
    {
      name: SharedFilters.TOPIC,
      id: data.topic?.map((topic) => topic.id).join(","),
      title: data.topic
        ? data.topic?.map((topic) => topic.title).join(",")
        : "انتخاب نشده",
      data: [],
      loading: false,
      multiSelection: true,
      isActive: false,
    },
    {
      name: SharedFilters.DATE,
      id: data.date?.map((date) => date.id).join(","),
      title: data.date
        ? data.date
            ?.map((date) => formatTimeJ(date.title, "jMMMM jYYYY"))
            .join(",")
        : "انتخاب نشده",
      data: [],
      loading: false,
      multiSelection: true,
      isActive: false,
    },
    {
      name: SharedFilters.PLACE,
      id: data.place?.map((place) => place.id).join(","),
      title: data.place
        ? data.place?.map((place) => place.title).join(",")
        : "انتخاب نشده",
      data: [],
      loading: false,
      isActive: false,
      multiSelection: true,
    },
  ];

  const deleteHandler = () => {
    setDeleteLoading(true);
    api
      .deleteArchived(data.id)
      .then(() => {
        toast("آزمون با موفقیت حذف شد", { type: "success" });
        setDeleted(true);
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
      params.append(SharedFilters.BUDGETING, data.budgeting.toString());
    }
    if (data.tip) {
      params.append(SharedFilters.TIP, data.tip.toString());
    }

    router.push(`${RoutePath.questions}?${params.toString()}`);
  };

  if (deleted) return null;

  return (
    <div className={`${style.archivedItemWrapper} card`}>
      <SelectFilterQroup dontHaveQuery items={filters} app={Apps.EXAM} />
      {!!data.title && <p>عبارت جست و جو شده: {data.title}</p>}
      {!!data.budgeting && <p>نمایش بودجه بندی سوالات</p>}
      {!!data.tip && <p>نمایش سوالات تیپ‌دار</p>}
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
