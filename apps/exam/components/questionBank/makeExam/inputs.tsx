"use client";
import React from "react";
import { OptionSwitch } from "@repo/shared_modules/components";
import {
  SharedFilters,
  ExamStatus,
} from "@repo/apps_shared_components/exam/types/filters.ts";
import { Apps } from "@repo/core/types/general";
import { useQuery } from "@tanstack/react-query";
import { api as coreApi } from "@repo/shared_modules/api";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import SelectFilters from "../../common/SelectFilters/SelectFilters";
import style from "../questionBank.module.scss";
import Button from "@/components/common/Button/Button";
import { RoutePath } from "@/constants/routPaths";

function MakeInputs() {
  const searchParams = useSearchParams();
  const route = useRouter();

  // TODO: change diffrent filter types

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

  const onStartClick = (start?: boolean) => {
    if (!searchParams?.get(SharedFilters.FIELD)) {
      toast.error("حداقل رشته را انتخاب کن!");
      return;
    }
    const params = new URLSearchParams(searchParams?.toString());
    params.set(
      SharedFilters.STATUS,
      start ? ExamStatus.STARTED : ExamStatus.DRAFT
    );

    route.push(`${RoutePath.make_exam}?${params.toString()}`);
  };

  return (
    <div className={`card ${style.filtersWrapper} ${style.makeInputs}`}>
      <SelectFilters page="maker" />
      <OptionSwitch
        name={SharedFilters.EXPLANATION}
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
        name={SharedFilters.RECORD}
        title="نمایش کارنامه تحلیلی آزمون"
        app={Apps.EXAM}
        addToQuery
        isDefaulChecked={true}
      />
      <OptionSwitch
        name={SharedFilters.MARKING}
        title="علامت گذاری سوالات و پاسخ برگ"
        app={Apps.EXAM}
        addToQuery
        isDefaulChecked={true}
      />
      <OptionSwitch
        name={SharedFilters.MANUAL_TIME}
        title="تعیین دستی زمان و تداد سوالات!"
        app={Apps.EXAM}
        addToQuery
      />
      <div className={style.makeInputsButtonWrapper}>
        <Button variant="secondary" onClick={() => onStartClick()}>
          فیلترکن و نشون بده!
        </Button>
        <Button onClick={() => onStartClick(true)}>شروع آزمون</Button>
      </div>
    </div>
  );
}

export default MakeInputs;
