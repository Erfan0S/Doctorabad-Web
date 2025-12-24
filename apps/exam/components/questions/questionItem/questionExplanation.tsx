import React, { useEffect } from "react";
import styles from "./questionItem.module.scss";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import Loading from "@/components/common/Loading/Loading";

type Props = {
  questionId: number;
  examId?: number;
  enabled?: boolean;
  setEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
};

function QuestionExplanation({
  questionId,
  enabled,
  examId,
  setEnabled,
}: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`questionExplanation-${questionId}-${examId}`],
    queryFn: () =>
      api.getQuestionExplanation({
        question_id: questionId,
        exam_id: examId,
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
    <div className={styles.answerWrapper}>
      <p>{explanation?.explanation}</p>
      {explanation?.files.map((file, i) => (
        <Image
          src={file}
          className={styles.questionImages}
          alt="پاسخ تشریحی"
          width={0}
          height={0}
          sizes="100vw"
          key={i}
        />
      ))}
      {!!explanation?.references && (
        <span className={`${styles.explanationReferences} card`}>
          {explanation.references}
        </span>
      )}
    </div>
  );
}

export default QuestionExplanation;
