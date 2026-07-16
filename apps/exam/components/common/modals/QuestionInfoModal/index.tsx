import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ModalWrapper } from "@repo/shared_modules/components";
import React from "react";
import { QuestionType } from "@/types/exam";

type Props = ModalProps<{
  question: QuestionType;
  examTitle: string;
}>;

function QuestionInfoModal({
  closeModal,
  data: { question, examTitle },
}: Props) {
  return (
    <ModalWrapper closeModal={closeModal} app={Apps.EXAM}>
      <div>
        <h3 className="w-full text-center text-purple text-[17px] font-extrabold mb-[21px]">اطلاعات سوال</h3>
        <ul className="flex flex-col gap-[5px] ps-[10px] [&>li]:ps-[14px] [&>li]:text-[15px] [&>li]:font-medium [&>li]:marker:content-['✔']">
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
