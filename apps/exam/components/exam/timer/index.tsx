"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/common/Button/Button";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import formatDuration from "@repo/core/utils/formatDuration";
import Loading from "@/components/common/Loading/Loading";
import {
  ExamStatus,
  SharedFilters,
} from "@repo/apps_shared_components/exam/types";

type Props = {
  totalQuestions: number;
};

function ExamTimer({ totalQuestions }: Props) {
  const [time, setTime] = useState(totalQuestions * 60);

  const searchParams = useSearchParams();
  const manual = searchParams?.get(SharedFilters.MANUAL_TIME);
  const status = searchParams?.get(SharedFilters.STATUS);
  const setSearchParams = useChangeSearchParamsFilter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!manual) return;
    setTime(Number(manual) * 60);
  }, [manual]);

  let timerInterval: NodeJS.Timeout | undefined;

  useEffect(() => {
    setLoading(false);
    if (status === ExamStatus.STARTED && time > 0) {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [status]);

  useEffect(() => {
    if (time <= 0) {
      setSearchParams({ [SharedFilters.STATUS]: ExamStatus.FINISHED });
    }
    if (status === ExamStatus.FINISHED || time <= 0) {
      clearInterval(timerInterval);
    }
  }, [time]);

  const handleEnd = () => {
    if (loading) return;
    if (status === ExamStatus.STARTED) {
      modalActions.addModal(ModalTypes.EXAM_END_CONFIRM, {
        setLoading,
      });
    } else {
      setLoading(true);
      setSearchParams({ [SharedFilters.STATUS]: ExamStatus.STARTED });
    }
  };

  return (
    <div className="flex flex-row items-center justify-between gap-[10px] bg-purple rounded-[15px] px-[15px] py-2 m-[10px]">
      <span className="text-white [font-size:larger] [&>span]:font-bold">
        زمان باقی مانده: <span>{formatDuration(time, true)}</span>
      </span>
      {status !== ExamStatus.FINISHED && (
        <Button
          className="flex-none [font-size:small] text-black p-[5px]"
          onClick={handleEnd}
          variant="secondary"
        >
          {loading ? (
            <Loading />
          ) : status === ExamStatus.STARTED ? (
            "پایان آزمون"
          ) : (
            "شروع آزمون"
          )}
        </Button>
      )}
    </div>
  );
}

export default ExamTimer;
