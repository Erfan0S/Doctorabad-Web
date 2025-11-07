"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./questionItem.module.scss";
import {
  BugIcon,
  HeartFillIcon,
  HeartIcon,
  InfoIcon,
} from "@repo/shared_modules/icons";
import { Button } from "@repo/shared_modules/components";

import { ExamStatus, QuestionStatus, QuestionType } from "../../../types/exam";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import QuestionInput from "./questionInputs/questionItemInput";
import Image from "next/image";
import QuestionExplanation from "./questionExplanation";
import Loading from "../../common/Loading";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";
import { Apps } from "@repo/core/types/general";
import { useToggleFavoriteQuestion } from "../../../hooks/useToggleFavoriteQuestion";
import { QuestionsAnswersContext } from "../../../contexts/questionsAnswersContext";
import { generateQuestionId } from "../../../utils/generateQuestionId";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { explanationError } from "../../../constants/massages";
import QuestionItemWaterMark from "./questionItemWaterMark";

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
  initUserAnswer?: string;
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
  initUserAnswer,
}: Props) {
  const [showTestAnswer, setShowTestAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus>(
    QuestionStatus.DEFAULT
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    initUserAnswer || null
  );
  const { addAnswer } = useContext(QuestionsAnswersContext);

  useEffect(() => {}, [initUserAnswer]);

  useEffect(() => {
    addAnswer(
      {
        options: question.options,
        userAnswer: selectedAnswer || undefined,
        status: questionStatus,
        answer: question.options
          .find((option) => option.is_correct)
          ?.id.toString(),
        lesson_id: question.lesson_id,
      },
      question.id
    );
  }, [selectedAnswer, questionStatus]);

  useEffect(() => {
    if (status === ExamStatus.FINISHED) setShowTestAnswer(true);
    else setShowTestAnswer(false);
  }, [status]);

  const AnewrButtons = () => {
    const pathName = usePathname();

    if (
      (status === ExamStatus.DRAFT || status === ExamStatus.STARTED) &&
      pathName?.includes("make")
    ) {
      return (
        <div>
          <Button
            app={Apps.EXAM}
            onClick={() =>
              setQuestionStatus((prev) =>
                prev === QuestionStatus.NoT_SURE
                  ? QuestionStatus.DEFAULT
                  : QuestionStatus.NoT_SURE
              )
            }
          >
            شک دارم
          </Button>
          <Button
            app={Apps.EXAM}
            onClick={() =>
              setQuestionStatus((prev) =>
                prev === QuestionStatus.DONT_KNOW
                  ? QuestionStatus.DEFAULT
                  : QuestionStatus.DONT_KNOW
              )
            }
          >
            بلد نیستم
          </Button>
        </div>
      );
    }

    if (status === ExamStatus.STARTED) return null;

    return (
      <div>
        {question.has_explanation && (
          <Button
            app={Apps.EXAM}
            onClick={authorizeClientAction(
              () => setShowAnswer((prev) => !prev),
              true
            )}
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
      className={`${styles.questionItem} card ${mobileMode ? styles.mobileMode : ""} ${questionStatus === QuestionStatus.NoT_SURE ? styles.notSureQuestion : ""} ${questionStatus === QuestionStatus.DONT_KNOW ? styles.dontKnowQuestion : ""}`}
      id={generateQuestionId(
        question.id.toString(),
        question.lesson_id.toString()
      )}
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
        <QuestionItemWaterMark />

        {question.options.map((option) => (
          <QuestionInput
            id={option.id.toString()}
            name={question.id.toString()}
            title={option.title}
            showAnswer={showTestAnswer}
            isCorrect={option.is_correct}
            key={option.id}
            status={status}
            onChange={(e) => {
              setSelectedAnswer(e.target.id);
            }}
            checked={selectedAnswer === option.id.toString()}
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
          setEnabled={setShowAnswer}
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
