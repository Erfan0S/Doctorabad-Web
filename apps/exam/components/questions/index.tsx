"use client";
import { useContext } from "react";
import QuestionItem from "./questionItem";
import {
  ExamDetailType,
  ExamStartSearchParams,
  QuestionType,
} from "../../types/exam";
import styles from "./questions.module.scss";
import { useSearchParams } from "next/navigation";
import { QuestionsAnswersContext } from "../../contexts/questionsAnswersContext";
import ExamFIlterNotFound from "@/components/common/FIlterNotFound";
import { QuestionsLessonsFilterContext } from "@/contexts/questionsLessonFilterContext";
import {
  QuestionListFilters,
  QuestionListFiltersKey,
} from "@/types/questionListFilters";
import { ExamStatus } from "@repo/apps_shared_components/exam/types";

type Props = {
  questions: QuestionType[];
  exam?: ExamDetailType;
  mobileMode?: boolean;
  isFavorite?: boolean;
  total?: number;
  startIndex?: number;
  fetchNextPage?: () => void;
  setIsEmpty?: (value: boolean) => void;
  showEmptyNotFound?: boolean;
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
  setIsEmpty,
  showEmptyNotFound = false,
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

  if (!filtredQuestions.length) {
    setIsEmpty && setIsEmpty(true);
    return showEmptyNotFound && <ExamFIlterNotFound />;
  }
  setIsEmpty && setIsEmpty(false);

  // if (
  //   questionFilter &&
  //   (questionFilter === QuestionListFilters.ANSWERED ||
  //     questionFilter === QuestionListFilters.NOT_ANSWERED)
  // ) {
  //   filtredQuestions = filtredQuestions.filter((question) => {
  //     switch (questionFilter) {
  //       case QuestionListFilters.ANSWERED:
  //         return answers[question.id]?.userAnswer;
  //       case QuestionListFilters.NOT_ANSWERED:
  //         return !answers[question.id]?.userAnswer;
  //       default:
  //         return true;
  //     }
  //   });
  // }

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
