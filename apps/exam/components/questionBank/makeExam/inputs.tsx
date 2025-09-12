"use client";
import React from "react";
import { OptionSwitch } from "@repo/shared_modules/components";
import { MakeFilters } from "@/types/filters";
import { Apps } from "@repo/core/types/general";
import { useQuery } from "@tanstack/react-query";
import { api as coreApi } from "@repo/shared_modules/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { toast } from "react-toastify";
import SelectFilters from "../../common/SelectFilters/SelectFilters";
import style from "../questionBank.module.scss";
import Button from "@/components/common/Button/Button";
import { api } from "@/api/Api";
import { authorizeClientAction } from "@repo/core/utils/authUtils";

function MakeInputs() {
  const searchParams = useSearchParams();
  const setSeachParam = useChangeSearchParamsFilter();
  const route = useRouter();

  const { data: planData, isLoading: planLoading } = useQuery({
    queryKey: ["userHasPlan"],
    queryFn: () => coreApi.getUserPlans(2),
  });

  const hasPlan =
    !!planData?.data.data && planData?.data.data.length > 0 ? true : false;

  const onExplanationSelect = () => {
    if (planLoading) return;
    if (hasPlan) {
      toast.success("شماطرح فعال دارید!");
    } else {
      toast.error("برای مشاهده پاسخ تشریحی، باید طرح فعال داشته باشید!");
      // route.push("/");
    }
  };

  const onStartClick = authorizeClientAction(() => console.log("start"));

  return (
    <div className={`card ${style.filtersWrapper} ${style.makeInputs}`}>
      <SelectFilters page="maker" />
      <OptionSwitch
        name={MakeFilters.EXPLANATION}
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
        name={MakeFilters.RECORD}
        title="نمایش کارنامه تحلیلی آزمون"
        app={Apps.EXAM}
        addToQuery
        isDefaulChecked={true}
      />
      <OptionSwitch
        name={MakeFilters.MARKING}
        title="علامت گذاری سوالات و پاسخ برگ"
        app={Apps.EXAM}
        addToQuery
        isDefaulChecked={true}
      />
      <OptionSwitch
        name={MakeFilters.MANUAL}
        title="تعیین دستی زمان و تداد سوالات!"
        app={Apps.EXAM}
        addToQuery
      />
      <div className={style.makeInputsButtonWrapper}>
        <Button variant="secondary">فیلترکن و نشون بده!</Button>
        <Button onClick={onStartClick}>شروع آزمون</Button>
      </div>
    </div>
  );
}

export default MakeInputs;
