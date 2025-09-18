"use client";
import React, { useState } from "react";
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
import { Input } from "@repo/shared_modules/ui";
import { RoutePath } from "@/constants/routPaths";
import { inBoundValue } from "@repo/core/utils/inBoundValue";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";

function MakeInputs() {
  const searchParams = useSearchParams();
  const route = useRouter();

  const [manual, setManual] = useState(false);
  const [time, setTime] = useState<string | number | undefined>();
  const [questions, setQuestions] = useState<string | number | undefined>();

  const { data: planData, isLoading: planLoading } = useQuery({
    queryKey: ["userHasPlan"],
    queryFn: () => coreApi.getUserPlans(2),
    enabled: !!isUserLoggedIn(),
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
    if (manual) {
      params.set(SharedFilters.MANUAL_TIME, time ? time.toString() : "300");
      params.set(
        SharedFilters.MANUAL_QUESTIONS,
        questions ? questions.toString() : "200"
      );
    }

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
        key={SharedFilters.EXPLANATION}
      />
      <OptionSwitch
        name={SharedFilters.SHOW_RECORD}
        title="نمایش کارنامه تحلیلی آزمون"
        app={Apps.EXAM}
        addToQuery
        // isDefaulChecked={true}
        key={SharedFilters.SHOW_RECORD}
      />
      <OptionSwitch
        name={SharedFilters.MARKING}
        title="علامت گذاری سوالات و پاسخ برگ"
        app={Apps.EXAM}
        addToQuery
        // isDefaulChecked={true}
        key={SharedFilters.MARKING}
      />
      <OptionSwitch
        name={SharedFilters.MANUAL_TIME}
        title="تعیین دستی زمان و تعداد سوالات!"
        app={Apps.EXAM}
        onToggle={(value) => setManual(value)}
      />
      {manual && (
        <div className={style.manualInputsWrapper}>
          <Input
            app={Apps.EXAM}
            type="number"
            disabled={!manual}
            placeholder="تعداد سوالات(حداکثر 300)"
            onChange={(e) =>
              setQuestions(inBoundValue(Number(e.target.value), 1, 300))
            }
            value={questions?.toString()}
            max={300}
            min={1}
          />
          <Input
            app={Apps.EXAM}
            type="number"
            disabled={!manual}
            placeholder="زمان آزمون(حداکثر 300 دقیقه)"
            onChange={(e) =>
              setTime(inBoundValue(Number(e.target.value), 0, 300))
            }
            value={time?.toString()}
            max={300}
            min={0}
          />
        </div>
      )}
      <div className={style.makeInputsButtonWrapper}>
        <Button
          variant="secondary"
          onClick={authorizeClientAction(() => onStartClick())}
        >
          فیلترکن و نشون بده!
        </Button>
        <Button onClick={authorizeClientAction(() => onStartClick(true))}>
          شروع آزمون
        </Button>
      </div>
    </div>
  );
}

export default MakeInputs;
