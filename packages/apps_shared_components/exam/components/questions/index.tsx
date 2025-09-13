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

type Props = {
  questions: QuestionType[];
  exam?: ExamDetailType;
  mobileMode?: boolean;
  isFavorite?: boolean;
};

function Questions({ questions, exam, mobileMode, isFavorite }: Props) {
  const searchParams = useSearchParams();
  const status = (searchParams?.get(ExamStartSearchParams.STATUS) ||
    ExamStatus.OBSERVING) as ExamStatus;

  const { lessonId, answers } = useContext(QuestionsAnswersContext);

  const filtredQuestions = lessonId
    ? questions.filter((question) => question.lesson_id.toString() === lessonId)
    : questions;

  console.log(questions);

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
            status={status}
            initUserAnswer={answers[question.id]?.userAnswer}
          />
        );
      })}
    </div>
  );
}

export default Questions;
