import React, { useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import Loading from "@/components/common/Loading/Loading";
import { QuestionAnswer } from "@/types/questions";

type Props = {
  questionId: number;
  examId?: number;
  enabled?: boolean;
  setEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
  answer?: QuestionAnswer | null;
};

function QuestionExplanation({
  questionId,
  enabled,
  examId,
  setEnabled,
  answer,
}: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`questionExplanation-${questionId}-${examId}`],
    queryFn: () =>
      api.getQuestionExplanation({
        question_id: questionId,
        exam_id: examId,
        answer: answer,
      }),
    enabled: !!isUserLoggedIn() && enabled,
    retry: (failureCount, error) => {
      const e = error as any;
      if (e.status == 422) {
        modalActions.addModal(ModalTypes.EXAM_DISCOUNT_PLANS);
        setEnabled && setEnabled(false);
        return false;
      }
      return true;
    },
  });

  const explanation = data?.data.data;

  if (isLoading) return <Loading />;

  if (error || !explanation) return null;

  return (
    <div className="flex flex-col gap-[10px] px-[15px] py-[10px] mx-[10px] border-t border-solid border-purple z-[5] [&_p]:w-full [&_p]:text-start [&_p]:m-0">
      <p>{explanation?.explanation}</p>
      {explanation?.files.map((file, i) => (
        <Image
          src={file}
          className="exam-question-img"
          alt="پاسخ تشریحی"
          width={0}
          height={0}
          sizes="100vw"
          key={i}
        />
      ))}
      {!!explanation?.references && (
        <span className="border border-solid border-purple w-fit px-[9px] py-1 card">
          {explanation.references}
        </span>
      )}
    </div>
  );
}

export default QuestionExplanation;
