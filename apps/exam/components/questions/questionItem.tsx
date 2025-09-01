"use client";
import React, { useState } from "react";
import styles from "./questions.module.scss";
import {
  BugIcon,
  HeartFillIcon,
  HeartIcon,
  InfoIcon,
} from "@repo/shared_modules/icons";
import Button from "../common/Button/Button";
import { QuestionType } from "@/types/exam";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";

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

const QuestionRadio = ({
  id,
  name,
  title,
  showAnswer,
  isCorrect,
}: {
  name: string;
  id: string;
  title: string;
  isCorrect?: boolean;
  showAnswer?: boolean;
}) => {
  const showAnswerClass = showAnswer
    ? isCorrect
      ? styles.radioCurrect
      : styles.radioWrong
    : "";
  return (
    <div className={`${styles.radioWrapper} ${showAnswerClass}`}>
      <input type="radio" name={name} id={id} />
      <label htmlFor={id} className={styles.radio}>
        <div />
      </label>
      <label htmlFor={id} className={styles.radioLabel}>
        {title}
      </label>
    </div>
  );
};

type Props = {
  question: QuestionType;
  index: number;
  total: number;
  examTitle: string;
};

function QuestionItem({ question, index, total, examTitle }: Props) {
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
          <QuestionRadio
            id={option.id.toString()}
            name={question.id.toString()}
            title={option.title}
            showAnswer={showTestAnswer}
            isCorrect={option.is_correct}
          />
        ))}
      </div>
      {showAnswer && (
        <div className={styles.answerWrapper}>
          <p>asdasdasdasdasdasda</p>
        </div>
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
