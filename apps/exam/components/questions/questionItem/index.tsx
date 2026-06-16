"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./questionItem.module.scss";
import { BugIcon, InfoIcon } from "@repo/shared_modules/icons";
import { Button, FavoriteHeartIcon } from "@repo/shared_modules/components";

import { QuestionStatus, QuestionType, QuestionTypes } from "@/types/exam";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import QuestionInput from "./questionInputs/questionItemInput";
import Image from "next/image";
import QuestionExplanation from "./questionExplanation";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { Apps } from "@repo/core/types/general";
import { QuestionsAnswersContext } from "@/contexts/questionsAnswersContext";
import { usePathname } from "next/navigation";
import QuestionItemWaterMark from "./questionItemWaterMark";
import { useToggleFavoriteQuestion } from "@/hooks/useToggleFavoriteQuestion";
import { generateQuestionId } from "@/utils/generateQuestionId";
import BookMarkIcon from "@/assets/svg/bookMark";
import { ExamStatus } from "@repo/apps_shared_components/exam/types";
import { api } from "@/api/Api";

const buttons = (
  question: QuestionType,
  examTitle: string,
  isFavoriteList?: boolean,
) => {
  const { isFavorite, toggleFavorite, isLoading } = useToggleFavoriteQuestion(
    isFavoriteList || question.favorite,
  );

  const bugReport = () =>
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.BUG_REPORT, {
        productId: question.id,
        app: Apps.EXAM,
      }),
    );

  return [
    {
      onClick: () => toggleFavorite(question.id),
      // TODO: use general FavoriteButton component if needed
      component: (
        <FavoriteHeartIcon
          loading={isLoading}
          isFavorite={isFavorite}
          app={Apps.EXAM}
          icon={<BookMarkIcon />}
          filledIcon={<BookMarkIcon className={styles.filledBookMark} />}
        />
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
  initUserAnswer?: string[];
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
    QuestionStatus.DEFAULT,
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string[] | null>(
    initUserAnswer || null,
  );
  const { addAnswer } = useContext(QuestionsAnswersContext);

  useEffect(() => {
    addAnswer(
      {
        options: question.options,
        userAnswer: selectedAnswer || undefined,
        status: questionStatus,
        answer: question.options
          .filter((option) => option.is_correct)
          .map((option) => option.id.toString()),
        lesson_id: question.lesson_id,
      },
      question.id,
    );
  }, [selectedAnswer, questionStatus]);

  useEffect(() => {
    if (status === ExamStatus.FINISHED) setShowTestAnswer(true);
    else setShowTestAnswer(false);
  }, [status]);

  const isTextQuestion = question.type === QuestionTypes.Text;

  const currectAnswer = question.options
    .filter((option) => option.is_correct)
    .map((option) => option.id.toString());

  const questionAnswerStatus = selectedAnswer
    ? selectedAnswer.length === currectAnswer.length &&
      selectedAnswer.every((value, index) => value === currectAnswer[index])
      ? 2
      : 1
    : null;

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
                  : QuestionStatus.NoT_SURE,
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
                  : QuestionStatus.DONT_KNOW,
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
              true,
            )}
          >
            پاسخ تشریحی
          </Button>
        )}
        {status !== ExamStatus.FINISHED && !isTextQuestion && (
          <Button
            app={Apps.EXAM}
            onClick={() => {
              if (!showTestAnswer) {
                api.submitQuestionMission({
                  question_id: question.id,
                  answer: questionAnswerStatus,
                });
              }
              setShowTestAnswer((prev) => !prev);
            }}
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
        question.lesson_id.toString(),
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

        {isTextQuestion ? (
          <textarea
            className={styles.questionTextInput}
            name={question.id.toString()}
            id={question.id.toString()}
            cols={10}
          />
        ) : (
          question.options.map((option) => (
            <QuestionInput
              id={option.id.toString()}
              name={question.id.toString()}
              title={option.title}
              showAnswer={showTestAnswer}
              isCorrect={option.is_correct}
              key={option.id}
              status={status}
              onChange={(e) => {
                setSelectedAnswer((prev) => {
                  if (question.type === QuestionTypes.SingleSelect || !prev)
                    return [e.target.id];

                  if (prev?.includes(e.target.id)) {
                    return prev.filter((id) => id !== e.target.id);
                  } else {
                    return [...prev, e.target.id];
                  }
                });
              }}
              checked={selectedAnswer?.includes(option.id.toString())}
              type={question.type}
            />
          ))
        )}
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
          answer={questionAnswerStatus}
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
