import { QuestionType } from "@/types/exam";
import { ModalProps } from "@repo/core/types/modals";
import React from "react";

type Props = ModalProps<{
  question: QuestionType;
}>;

function QuestionInfoModal({ closeModal, data: { question } }: Props) {
  return <div>QuestionInfoModal</div>;
}

export default QuestionInfoModal;
