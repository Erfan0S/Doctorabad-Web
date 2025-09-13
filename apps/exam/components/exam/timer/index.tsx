"use client";
import React, { useEffect } from "react";
import styles from "./timer.module.scss";
import Button from "@/components/common/Button/Button";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import formatDuration from "@repo/core/utils/formatDuration";
import {
  SharedFilters,
  ExamStatus,
} from "@repo/apps_shared_components/exam/types/filters.ts";

// TODO: use context instead of searchParams for end state

type Props = {
  totalQuestions: number;
};

function ExamTimer({ totalQuestions }: Props) {
  const [time, setTime] = React.useState(totalQuestions * 60);

  const searchParams = useSearchParams();
  const manual = searchParams?.get(SharedFilters.MANUAL_TIME);
  const status = searchParams?.get(SharedFilters.STATUS);
  const setSearchParams = useChangeSearchParamsFilter();

  useEffect(() => {
    if (!manual) return;
    setTime(Number(manual) * 60);
  }, [manual]);

  let timerInterval: NodeJS.Timeout | undefined;

  useEffect(() => {
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
    if (status === ExamStatus.STARTED) {
      modalActions.addModal(ModalTypes.EXAM_END_CONFIRM);
    } else {
      setSearchParams({ [SharedFilters.STATUS]: ExamStatus.STARTED });
    }
  };

  return (
    <div className={styles.timerWrapper}>
      <span>
        زمان باقی مانده: <span>{formatDuration(time, true)}</span>
      </span>
      {status !== ExamStatus.FINISHED && (
        <Button onClick={handleEnd} variant="secondary">
          {status === ExamStatus.STARTED ? "پایان آزمون" : "شروع آزمون"}
        </Button>
      )}
    </div>
  );
}

export default ExamTimer;
