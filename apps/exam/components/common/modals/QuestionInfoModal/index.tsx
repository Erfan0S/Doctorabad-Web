import { QuestionType } from "@/types/exam";
import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ModalWrapper } from "@repo/shared_modules/components";
import React from "react";
import style from "./questionInfoModal.module.scss";

type Props = ModalProps<{
  question: QuestionType;
  examTitle: string;
}>;

// ! TODO: need to move to app_shared_components

function QuestionInfoModal({
  closeModal,
  data: { question, examTitle },
}: Props) {
  return (
    <ModalWrapper closeModal={closeModal} app={Apps.EXAM}>
      <div className={style.questionInfoModal}>
        <h3>اطلاعات سوال</h3>
        <ul>
          <li>
            <span>رشته {question.field}</span>
          </li>
          <li>
            <span>نام آزمون: {question.grade}</span>
          </li>
          <li>
            <span>درس {question.lesson}</span>
          </li>
          <li>
            <span>مبحث {question.topics.join(", ")}</span>
          </li>
          <li>
            <span>{question.dates.join(", ")}</span>
          </li>
          <li>
            <span>{question.places.join(", ")}</span>
          </li>
        </ul>
      </div>
    </ModalWrapper>
  );
}

export default QuestionInfoModal;
