import { ExamType } from "@/types/exam";
import {
  SharedFilters,
  ExamStatus,
} from "@repo/apps_shared_components/exam/types/filters.ts";
import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ModalWrapper, OptionSwitch } from "@repo/shared_modules/components";
import React, { useState } from "react";
import style from "./ExamStartodal.module.scss";
import { useRouter } from "next/navigation";
import { RoutePath } from "@/constants/routPaths";

type Props = ModalProps<{
  exam: ExamType;
}>;

const inBoundValue = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

function ExamStartModal({ closeModal, data }: Props) {
  const { exam } = data;
  const [showRecord, setShowRecord] = useState(false);
  const [haveManualTime, setHaveManualTime] = useState(false);
  const [manualTime, setManualTime] = useState<number | null>(null);
  const router = useRouter();

  const handleStart = () => {
    setTimeout(
      () =>
        router.push(
          `${RoutePath.single}/${exam.id}?${SharedFilters.STATUS}=${ExamStatus.STARTED}&${SharedFilters.SHOW_RECORD}=${showRecord ? 1 : 0}${
            haveManualTime && !!manualTime
              ? `&${SharedFilters.MANUAL_TIME}=${manualTime}`
              : ""
          }`
        ),
      100
    );
    closeModal();
  };

  const onTimeToggle = (value: boolean) => {
    setHaveManualTime(value);
    if (!value) setManualTime(null);
  };

  return (
    <ModalWrapper
      className={style.examStartModalWrapper}
      app={Apps.EXAM}
      closeModal={closeModal}
      haveAppIcon
      submitText="بزن بریم!"
      onSubmit={handleStart}
    >
      <h3>{exam.title}</h3>
      <div className={style.examStartModalInfo}>
        <span>{exam.date}</span>
        <span>{exam.place}</span>
      </div>
      <div className={style.examStartModalOptions}>
        <OptionSwitch
          name="Show_Record"
          title="نمایش کارنامه تحصیلی"
          app={Apps.EXAM}
          onToggle={(value) => setShowRecord(value)}
        />
        <OptionSwitch
          name="Manual_Time"
          title="تعیین دستی زمان آزمون"
          app={Apps.EXAM}
          onToggle={onTimeToggle}
        />
        {haveManualTime && (
          <input
            type="number"
            placeholder="زمان آزمون(حداکثر 300 دقیقه)"
            className={style.examStartModalTime}
            onChange={(e) =>
              setManualTime(inBoundValue(Number(e.target.value), 0, 300))
            }
            value={manualTime?.toString() || ""}
            min="0"
            max="300"
          />
        )}
      </div>
    </ModalWrapper>
  );
}

export default ExamStartModal;
