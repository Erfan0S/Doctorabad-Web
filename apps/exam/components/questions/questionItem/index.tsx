"use client";
import React, { useState } from "react";
import styles from "./questionItem.module.scss";
import {
  BugIcon,
  HeartFillIcon,
  HeartIcon,
  InfoIcon,
} from "@repo/shared_modules/icons";
import Button from "../../common/Button/Button";
import { QuestionType } from "@/types/exam";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import QuestionInput from "./questionItemInput";
import Loading from "@/components/common/Loading/Loading";
import Image from "next/image";
import QuestionExplanation from "./questionExplanation";

const buttons = (question: QuestionType, examTitle: string) => [
  {
    onClick: () => null,
    component: question.favorite ? (
      <HeartFillIcon className={styles.favoriteFillIcon} />
    ) : (
      <HeartIcon />
    ),
  },
  {
    onClick: () =>
      modalActions.addModal(ModalTypes.QUESTION_INFO, {
        question,
        examTitle,
      }),
    component: <InfoIcon />,
  },
  {
    onClick: () => null,
    component: <BugIcon />,
  },
];

type Props = {
  question: QuestionType;
  index: number;
  total: number;
  examTitle: string;
  examId: number;
};

function QuestionItem({ question, index, total, examTitle, examId }: Props) {
  const [showTestAnswer, setShowTestAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className={`${styles.questionItem} card`}>
      <h4>
        <span>{`${index + 1}/${total}`} - </span>
        {question.title}
        <span
          className={styles.category}
          style={{
            backgroundColor: `#${question.lesson_color_code}`,
          }}
        >
          {question.lesson}
        </span>
      </h4>
      <div className={styles.optionsWrapper}>
        {question.options.map((option) => (
          <QuestionInput
            id={option.id.toString()}
            name={question.id.toString()}
            title={option.title}
            showAnswer={showTestAnswer}
            isCorrect={option.is_correct}
          />
        ))}
        {question.files.map((file, i) => (
          <Image
            src={file}
            alt="عکس سوال"
            className={styles.questionImages}
            width={0}
            height={0}
            sizes="100vw"
            key={i}
          />
        ))}
      </div>
      {showAnswer && (
        <QuestionExplanation
          questionId={question.id}
          // examId={examId}
          enabled={showAnswer}
        />
      )}
      <div className={styles.buttonsWrapper}>
        <div className={styles.actionButtons}>
          {buttons(question, examTitle).map((button) => {
            return <button onClick={button.onClick}>{button.component}</button>;
          })}
        </div>
        <div>
          {question.has_explanation && (
            <Button onClick={() => setShowAnswer((prev) => !prev)}>
              پاسخ تشریحی
            </Button>
          )}
          <Button onClick={() => setShowTestAnswer((prev) => !prev)}>
            پاسخ تستی
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
