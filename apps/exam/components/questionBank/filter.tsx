"use client";
import React from "react";
import Button from "../common/Button/Button";
import style from "./questionBank.module.scss";
import SelectFilters from "../common/SelectFilters/SelectFilters";
import { Apps } from "@repo/core/types/general";
import { OptionSwitch } from "@repo/shared_modules/components";
import { QuesTionFilters } from "@/types/filters";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import QuestionSearchInpt from "./QuestionSearchInpt";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import {
  SidePanelFavoriteTab,
  SidePanelPage,
} from "@repo/core/types/sidePanel";
import { api } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";

function QuestionBankFilter() {
  const searchParams = useSearchParams();
  const setSeachParam = useChangeSearchParamsFilter();

  const { data: planData, isLoading: planLoading } = useQuery({
    queryKey: ["userHasPlan"],
    queryFn: () => api.userHasPlan(),
  });
  const hasPlan =
    !!planData?.data.data && planData?.data.data.length > 0 ? true : false;

  const onExplanationSelect = () => {
    if (planLoading) return;
    if (hasPlan) {
      toast.success("شماطرح فعال دارید!");
    } else {
      toast.error("برای مشاهده پاسخ تشریحی، باید طرح فعال داشته باشید!");
      document.getElementById("discountPlansElement")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`${style.filterContainer} container`}>
      <div className={`card ${style.topButtons}`}>
        <Button
          onClick={() =>
            modalActions.addModal(ModalTypes.SIDE_PANEL, {
              initialPage: SidePanelPage.FAVORITES,
              data: {
                initialTab: SidePanelFavoriteTab.EXAM_CENTER,
                fromHome: true,
              },
            })
          }
        >
          سوالات مورد علاقه‌من
        </Button>
        <Button disabled>آزمون‌های ساخته شده من</Button>
      </div>
      <div className={`card ${style.filtersWrapper}`}>
        <SelectFilters />
        <QuestionSearchInpt />
        <OptionSwitch
          name={QuesTionFilters.EXPLANATION}
          title="نمایش تشریحی سوالات!"
          app={Apps.EXAM}
          addToQuery
          onClick={onExplanationSelect}
          isActive={hasPlan}
          isLoading={planLoading}
          isDefaulChecked={hasPlan}
          canChange={false}
        />
        <OptionSwitch
          name={QuesTionFilters.BUDGETING}
          title="نمایش بودجه‌بندی سوالات!"
          app={Apps.EXAM}
          isActive={!!searchParams?.get(QuesTionFilters.LESSON)}
          onClick={() => {
            !!searchParams?.get(QuesTionFilters.LESSON) ||
              toast.error("حتما درس باید انتخاب شده باشد!");
          }}
          addToQuery
        />
        <OptionSwitch
          name={QuesTionFilters.TIP}
          title="فقط نمایش سوالات تیپ دار!"
          app={Apps.EXAM}
          addToQuery
        />

        <Button className={style.submitBtn} type="submit">
          فیلتر‌کن و نشون‌بده!
        </Button>
      </div>
    </div>
  );
}

export default QuestionBankFilter;
