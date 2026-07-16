"use client";
import { useContext, useEffect, useState } from "react";
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

const BTN_ROW =
  "flex flex-row items-center gap-[10px] [&>button]:flex-none [&>button]:[font-size:larger]";

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
          filledIcon={<BookMarkIcon className="text-purple fill-purple" />}
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

  const statusBg =
    questionStatus === QuestionStatus.NoT_SURE
      ? "bg-[#ffffca]"
      : questionStatus === QuestionStatus.DONT_KNOW
        ? "bg-[#e9e9e9]"
        : "";

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
        <div className={BTN_ROW}>
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
      <div className={BTN_ROW}>
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
      className={`overflow-hidden flex flex-col relative ${statusBg || "bg-white"} card ${mobileMode ? "flex-nowrap gap-[5px] [&_button]:!text-[11px] [&_div]:gap-[5px]" : ""}`}
      id={generateQuestionId(
        question.id.toString(),
        question.lesson_id.toString(),
      )}
    >
      <h4
        className={`p-3 shadow-[0_3px_8px_rgba(0,0,0,0.13)] ${statusBg || "bg-[#eeeeee]"} text-[14px] font-medium relative z-10 [&_span]:font-extrabold`}
      >
        <span>{`${index + 1}/${total}`} - </span>
        {question.title}
        <span
          className="absolute left-3 bottom-0 translate-y-1/2 bg-blue rounded-[20px] text-[12px] font-bold px-[7px] py-1 text-white"
          style={{
            backgroundColor: `#${question.lesson_color_code}`,
          }}
        >
          {/* @ts-ignore TODO : fix */}
          {question.lesson || question.lesson_title}
        </span>
      </h4>
      <div className="p-3 flex flex-col gap-[5px] relative [&_img]:mt-[10px]">
        <QuestionItemWaterMark />

        {isTextQuestion ? (
          <textarea
            className="w-full z-[1] min-h-[30px] max-h-[200px] rounded-[3px] focus-visible:outline-none focus-visible:border-purple"
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
            className="exam-question-img"
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
      <div
        className={`flex flex-row justify-between p-3 ${statusBg || "bg-[#eeeeee]"} z-10 max-[425px]:flex-nowrap max-[425px]:gap-[5px] max-[425px]:[&_button]:text-[11px] max-[425px]:[&_svg]:w-[17px] max-[425px]:[&_svg]:h-auto max-[425px]:[&_div]:gap-[5px] ${mobileMode ? "[&_svg]:w-[17px] [&_svg]:h-auto" : ""}`}
      >
        <div
          className={`${BTN_ROW} [&>button]:text-black [&>button]:bg-white [&>button]:rounded-[10px] [&>button]:border [&>button]:border-solid [&>button]:border-gray-light [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:p-2 [&>button]:cursor-pointer`}
        >
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
