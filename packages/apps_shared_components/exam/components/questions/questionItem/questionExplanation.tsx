import React from "react";
import styles from "./questionItem.module.scss";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../common/Loading";
import { api } from "../../../api/Api";

type Props = {
  questionId: number;
  examId?: number;
  enabled?: boolean;
};

function QuestionExplanation({ questionId, enabled, examId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["questions", questionId],
    queryFn: () =>
      api.getQuestionExplanation({
        question_id: questionId,
        exam_id: examId,
      }),
    enabled,
    retry: (failureCount, error) => {
      const e = error as any;
      if (e.status == 422) {
        return false;
      }
      return true;
    },
  });

  const explanation = data?.data.data;

  return (
    <div className={styles.answerWrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default QuestionExplanation;
