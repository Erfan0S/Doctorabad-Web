"use client";
import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ModalWrapper } from "@repo/shared_modules/components";
import React, { useContext, useEffect } from "react";
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

const STATISTIC_COLOR = {
  red: "[--statistic-color:#ed3152]",
  yellow: "[--statistic-color:#ffcc00]",
  gray: "[--statistic-color:#949494]",
};

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
      className={`flex flex-row gap-[5px] w-[45%] [&>span]:[font-size:larger] [&>span]:leading-[30px] [&>span]:font-semibold ${!!color ? STATISTIC_COLOR[color] : ""}`}
    >
      <span className="bg-[var(--statistic-color)] text-white text-center w-[50px] rounded-[5px]">
        {value}
      </span>
      <span className="text-[var(--statistic-color)]">{title}</span>
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
  const optionColorClass = () => {
    switch (question.status) {
      case QuestionStatus.DONT_KNOW:
        return "[--option-color:#949494] [&>div]:bg-[var(--option-color)]";

      case QuestionStatus.NoT_SURE:
        return "[--option-color:#ffcc00]";

      default:
        return question.userAnswer
          ? "[--option-color:#a167d0]"
          : "[--option-color:#ed3152]";
    }
  };

  return (
    <div
      className="flex flex-row items-start cursor-pointer"
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
      {/* ponytail: physical text-left/ml kept — this block is forced ltr */}
      <span className="text-purple font-semibold [font-size:larger] min-w-[20px] text-left">
        {index + 1}
      </span>
      <div
        className={`flex flex-row gap-[5px] ml-[30px] ${optionColorClass()}`}
      >
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-[5px] border border-solid border-[var(--option-color)] ${
              question.userAnswer?.includes(option.id.toString())
                ? "bg-[var(--option-color)]"
                : ""
            }`}
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
      className="!justify-start !gap-5 !max-h-[80vh]"
    >
      <div className="w-full flex flex-row flex-wrap gap-[5px] justify-center [--statistic-color:#a167d0] after:content-[''] after:w-[90%] after:border-b after:border-solid after:border-purple after:m-auto after:mt-5">
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
      <p className="w-full flex flex-row gap-[5px] justify-center p-[10px] [font-size:larger] font-medium [&_svg]:h-[25px] [&_svg]:w-[25px]">
        <InfoIcon />
        با کلیک روی هر سوال یا گزینه‌های روبروی آن، میتونین به اون سوال پیمایش
        کنید!
      </p>
      <div className="w-[90%] m-auto overflow-y-auto h-full flex flex-col gap-[5px] [direction:ltr]">
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
