"use client";
import React from "react";
import QuestionItem from "./questionItem";
import { QuestionType } from "@/types/exam";
import styles from "./questions.module.scss";

type Props = {
  questions: QuestionType[];
};

function Questions({ questions }: Props) {
  return (
    <div className={`${styles.questionsWrapper} container`}>
      {questions.map((question, index) => {
        return (
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            total={questions.length}
          />
        );
      })}
    </div>
  );
}

export default Questions;
