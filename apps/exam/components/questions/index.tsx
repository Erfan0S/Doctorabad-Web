"use client";
import React from "react";
import QuestionItem from "./questionItem";
import { ExamDetailType, QuestionType } from "@/types/exam";
import styles from "./questions.module.scss";

type Props = {
  questions: QuestionType[];
  exam: ExamDetailType;
};

function Questions({ questions, exam }: Props) {
  console.log(questions, exam);
  return (
    <div className={`${styles.questionsWrapper} container`}>
      {questions.map((question, index) => {
        return (
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            total={questions.length}
            examTitle={exam.title}
            examId={exam.id}
          />
        );
      })}
    </div>
  );
}

export default Questions;
