"use client";
import { useContext } from "react";
import QuestionItem from "./questionItem";
import {
  ExamDetailType,
  ExamStartSearchParams,
  ExamStatus,
  QuestionType,
} from "../../types/exam";
import styles from "./questions.module.scss";
import { useSearchParams } from "next/navigation";
import { QuestionsAnswersContext } from "../../contexts/questionsAnswersContext";
import {
  QuestionListFilters,
  QuestionListFiltersKey,
} from "../../types/questionListFilters";

type Props = {
  questions: QuestionType[];
  exam?: ExamDetailType;
  mobileMode?: boolean;
  isFavorite?: boolean;
  total?: number;
  startIndex?: number;
};

function Questions({
  questions,
  exam,
  mobileMode,
  isFavorite,
  total,
  startIndex = 0,
}: Props) {
  const searchParams = useSearchParams();
  const status = (searchParams?.get(ExamStartSearchParams.STATUS) ||
    ExamStatus.OBSERVING) as ExamStatus;

  const questionFilter = searchParams?.get(
    QuestionListFiltersKey
  ) as QuestionListFilters;

  const { lessonId, answers } = useContext(QuestionsAnswersContext);

  let filtredQuestions = lessonId
    ? questions.filter((question) => question.lesson_id.toString() === lessonId)
    : questions;

  if (
    questionFilter &&
    (questionFilter === QuestionListFilters.ANSWERED ||
      questionFilter === QuestionListFilters.NOT_ANSWERED)
  ) {
    filtredQuestions = filtredQuestions.filter((question) => {
      switch (questionFilter) {
        case QuestionListFilters.ANSWERED:
          return answers[question.id]?.userAnswer;
        case QuestionListFilters.NOT_ANSWERED:
          return !answers[question.id]?.userAnswer;
        default:
          return true;
      }
    });
  }

  return (
    <div className={`${styles.questionsWrapper} container`}>
      {filtredQuestions.map((question, index) => {
        return (
          <QuestionItem
            key={question.id}
            question={question}
            index={index + startIndex}
            total={total || questions.length}
            examTitle={exam?.title}
            examId={exam?.id}
            mobileMode={mobileMode}
            isFavorite={isFavorite}
            status={status}
            initUserAnswer={answers[question.id]?.userAnswer}
          />
        );
      })}
    </div>
  );
}

export default Questions;
