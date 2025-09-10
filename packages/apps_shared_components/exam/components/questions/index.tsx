"use client";
import React from "react";
import QuestionItem from "./questionItem";
import { ExamDetailType, QuestionType } from "../../types/exam";
import styles from "./questions.module.scss";
import { useSearchParams } from "next/navigation";
import { SharedFilters } from "../../types/filters";

type Props = {
  questions: QuestionType[];
  exam?: ExamDetailType;
  mobileMode?: boolean;
  isFavorite?: boolean;
};

function Questions({ questions, exam, mobileMode, isFavorite }: Props) {
  const searchParams = useSearchParams();
  const lessonId = searchParams?.get(SharedFilters.LESSON);

  const filtredQuestions = lessonId
    ? questions.filter((question) => question.lesson_id.toString() === lessonId)
    : questions;
  return (
    <div className={`${styles.questionsWrapper} container`}>
      {filtredQuestions.map((question, index) => {
        return (
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            total={questions.length}
            examTitle={exam?.title}
            examId={exam?.id}
            mobileMode={mobileMode}
            isFavorite={isFavorite}
          />
        );
      })}
    </div>
  );
}

export default Questions;
