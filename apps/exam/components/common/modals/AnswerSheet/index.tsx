"use client";
import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ModalWrapper } from "@repo/shared_modules/components";
import React, { useContext, useEffect } from "react";
import style from "./answerSheetModal.module.scss";
import { generateQuestionId } from "@/utils/generateQuestionId";
import {
  QuestionsAnswerContextType,
  QuestionsAnswersContextProviderType,
} from "@/contexts/questionsAnswersContext";
import { QuestionStatus } from "@/types/exam";
import { InfoIcon } from "@repo/shared_modules/icons";

type Props = ModalProps<{
  questionsAnswersContext: QuestionsAnswersContextProviderType;
}>;

const AnswerSheetStatistic = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color?: "red" | "yellow" | "gray";
}) => {
  return (
    <div
      className={style.answerSheetStatistic + ` ${!!color ? style[color] : ""}`}
    >
      <span>{value}</span>
      <span>{title}</span>
    </div>
  );
};

const AnswerSheetQuestion = ({
  index,
  question,
  questionId,
  closeModal,
}: {
  question: QuestionsAnswerContextType;
  index: number;
  questionId: string;
  closeModal: () => void;
}) => {
  const optionClassName = () => {
    switch (question.status) {
      case QuestionStatus.DONT_KNOW:
        return style.dontKnowOptions;

      case QuestionStatus.NoT_SURE:
        return style.notSureOptions;

      default:
        break;
    }
  };

  return (
    <div
      className={style.answerSheetQuestion}
      onClick={() => {
        closeModal();
        setTimeout(() => {
          document
            .getElementById(
              generateQuestionId(questionId, question.lesson_id.toString())
            )
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }}
    >
      <span>{index + 1}</span>
      <div
        className={`${style.answerSheetOptions} ${question.userAnswer ? style.selectedWrapper : ""} ${optionClassName()}`}
      >
        {question.options.map((option, index) => (
          <div
            key={index}
            className={
              question.userAnswer?.includes(option.id.toString())
                ? style.selected
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
};

function AnswerSheetModal({ closeModal, data }: Props) {
  const {
    answers,
    getUnAnsweredQuestions,
    getWrongAnswers,
    getCorrectAnswers,
  } = data.questionsAnswersContext;

  const answeredQuestionsCount =
    getCorrectAnswers().length + getWrongAnswers().length;
  const unAnsweredQuestionsCount = getUnAnsweredQuestions().length;
  const notSureQuestionsCount = Object.values(answers).filter((answer) => {
    return answer.status === QuestionStatus.NoT_SURE;
  }).length;
  const dontKnowQuestionsCount = Object.values(answers).filter((answer) => {
    return answer.status === QuestionStatus.DONT_KNOW;
  }).length;

  return (
    <ModalWrapper
      closeModal={closeModal}
      haveAppIcon={false}
      haveCloseBtn={false}
      app={Apps.EXAM}
      className={style.answerSheetModalWrapper}
    >
      <div className={style.answerSheetStatisticWrapper}>
        <AnswerSheetStatistic
          title="پاسخ داده شده"
          value={answeredQuestionsCount.toString()}
        />
        <AnswerSheetStatistic
          title="پاسخ داده نشده"
          value={unAnsweredQuestionsCount.toString()}
          color="red"
        />
        <AnswerSheetStatistic
          title="شک دارم"
          value={notSureQuestionsCount.toString()}
          color="yellow"
        />
        <AnswerSheetStatistic
          title="بلد نیستم"
          value={dontKnowQuestionsCount.toString()}
          color="gray"
        />
      </div>
      <p className={style.infoText}>
        <InfoIcon />
        با کلیک روی هر سوال یا گزینه‌های روبروی آن، میتونین به اون سوال پیمایش
        کنید!
      </p>
      <div className={style.answerSheetQuestionsWrapper}>
        {Object.entries(answers)
          .reverse()
          .map(([key, answer], index) => (
            <AnswerSheetQuestion
              question={answer}
              index={index}
              key={key}
              questionId={key}
              closeModal={closeModal}
            />
          ))}
      </div>
    </ModalWrapper>
  );
}

export default AnswerSheetModal;
