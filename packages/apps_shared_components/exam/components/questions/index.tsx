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
import { QuestionsLessonsFilterContext } from "../..";

type Props = {
  questions: QuestionType[];
  exam?: ExamDetailType;
  mobileMode?: boolean;
  isFavorite?: boolean;
  total?: number;
  startIndex?: number;
  fetchNextPage?: () => void;
};

// TODO: test and add multy select questions

function Questions({
  questions,
  exam,
  mobileMode,
  isFavorite,
  total,
  startIndex = 0,
  fetchNextPage,
}: Props) {
  const searchParams = useSearchParams();
  const status = (searchParams?.get(ExamStartSearchParams.STATUS) ||
    ExamStatus.OBSERVING) as ExamStatus;

  const questionFilter = searchParams?.get(
    QuestionListFiltersKey
  ) as QuestionListFilters;

  const { answers } = useContext(QuestionsAnswersContext);
  const { lessonIds } = useContext(QuestionsLessonsFilterContext);

  let filtredQuestions =
    lessonIds.length > 0
      ? questions.filter((question) =>
          lessonIds.includes(question.lesson_id.toString())
        )
      : questions;

  if (
    (filtredQuestions.length === 0 || filtredQuestions.length < 10) &&
    fetchNextPage
  ) {
    fetchNextPage();
  }

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
    <div
      className={`${styles.questionsWrapper} container`}
      onContextMenu={(e) => e.preventDefault()}
    >
      {filtredQuestions.map((question, index) => {
        return (
          <QuestionItem
            key={question.id}
            question={question}
            index={index + startIndex}
            total={
              lessonIds.length > 0
                ? filtredQuestions.length
                : total || questions.length
            }
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
