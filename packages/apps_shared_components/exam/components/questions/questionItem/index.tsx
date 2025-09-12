"use client";
import React, { useEffect, useState } from "react";
import styles from "./questionItem.module.scss";
import {
  BugIcon,
  HeartFillIcon,
  HeartIcon,
  InfoIcon,
} from "@repo/shared_modules/icons";
import { Button } from "@repo/shared_modules/components";

import { ExamStatus, QuestionType } from "../../../types/exam";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import QuestionInput from "./questionItemInput";
import Image from "next/image";
import QuestionExplanation from "./questionExplanation";
import Loading from "../../common/Loading";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { Apps } from "@repo/core/types/general";
import { useToggleFavoriteQuestion } from "../../../hooks/useToggleFavoriteQuestion";

const buttons = (
  question: QuestionType,
  examTitle: string,
  isFavoriteList?: boolean
) => {
  const { isFavorite, toggleFavorite, isLoading } = useToggleFavoriteQuestion(
    isFavoriteList || question.favorite
  );

  const bugReport = () =>
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.BUG_REPORT, {
        productId: question.id,
        app: Apps.EXAM,
      })
    );

  return [
    {
      onClick: () => toggleFavorite(question.id),
      component: isLoading ? (
        <Loading />
      ) : isFavorite ? (
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
      onClick: bugReport(),
      component: <BugIcon />,
    },
  ];
};

type Props = {
  question: QuestionType;
  index: number;
  total: number;
  examTitle?: string;
  examId?: number;
  mobileMode?: boolean;
  isFavorite?: boolean;
  status?: ExamStatus;
};

function QuestionItem({
  question,
  index,
  total,
  examTitle,
  examId,
  mobileMode,
  isFavorite,
  status,
}: Props) {
  const [showTestAnswer, setShowTestAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (status === ExamStatus.FINISHED) setShowTestAnswer(true);
    else setShowTestAnswer(false);
  }, [status]);

  const AnewrButtons = () => {
    if (status === ExamStatus.STARTED) return null;

    if (status === ExamStatus.DRAFT) {
      return (
        <div>
          <Button app={Apps.EXAM}>شک دارم</Button>
          <Button app={Apps.EXAM}>بلد نیستم</Button>
        </div>
      );
    }

    return (
      <div>
        {question.has_explanation && (
          <Button
            app={Apps.EXAM}
            onClick={() => setShowAnswer((prev) => !prev)}
          >
            پاسخ تشریحی
          </Button>
        )}
        {status !== ExamStatus.FINISHED && (
          <Button
            app={Apps.EXAM}
            onClick={() => setShowTestAnswer((prev) => !prev)}
          >
            پاسخ تستی
          </Button>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${styles.questionItem} card ${mobileMode ? styles.mobileMode : ""}`}
    >
      <h4>
        <span>{`${index + 1}/${total}`} - </span>
        {question.title}
        <span
          className={styles.category}
          style={{
            backgroundColor: `#${question.lesson_color_code}`,
          }}
        >
          {/* @ts-ignore TODO : fix */}
          {question.lesson || question.lesson_title}
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
            key={option.id}
            status={status}
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
      {showAnswer && question.has_explanation && (
        <QuestionExplanation
          questionId={question.id}
          examId={examId}
          enabled={showAnswer}
        />
      )}
      <div className={styles.buttonsWrapper}>
        <div className={styles.actionButtons}>
          {buttons(question, examTitle || "_", isFavorite).map((button, i) => {
            return (
              <button onClick={button.onClick} key={i}>
                {button.component}
              </button>
            );
          })}
        </div>
        <AnewrButtons />
      </div>
    </div>
  );
}

export default QuestionItem;
