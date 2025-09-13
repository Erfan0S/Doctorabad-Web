"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./examRecord.module.scss";
import { QuestionsAnswersContext } from "@repo/apps_shared_components/exam/contexts/questionsAnswersContext.tsx";
import { LessonType } from "@/types/exam";
import { OptionSwitch } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

type Props = {
  lessons: LessonType[];
  totalQuestions: number | string;
};

const PercentageBar = ({
  percentage,
  title,
  color,
}: {
  percentage: number | string;
  title: string;
  color?: "green" | "red" | "yellow";
}) => {
  return (
    <div className={style.percentageBarWrapper}>
      <div className={style.percentageBarTitle}>
        <span>{title}</span>
        <span>%{percentage}</span>
      </div>
      <div className={`${style.percentageBar} ${!!color ? style[color] : ""}`}>
        <div style={{ left: `${percentage}%` }} />
      </div>
    </div>
  );
};

function ExamRecord({ lessons, totalQuestions }: Props) {
  const {
    answers,
    getCorrectAnswers,
    getWrongAnswers,
    getUnAnsweredQuestions,
  } = useContext(QuestionsAnswersContext);
  const [negativeScore, setNegativeScore] = useState(false);

  const correctAnswers = getCorrectAnswers();
  const wrongAnswers = getWrongAnswers();
  const unAnsweredQuestions = getUnAnsweredQuestions();

  useEffect(() => {
    console.log(unAnsweredQuestions.length);
  }, [getUnAnsweredQuestions()]);

  const calculatePercentage = (
    correct: number,
    wrong: number,
    total: number,
    negativeScore: boolean
  ) => {
    if (negativeScore) {
      return (((3 * correct - wrong) / (3 * total)) * 100).toFixed(1);
    } else {
      return ((correct / total) * 100).toFixed(1);
    }
  };

  return (
    <div className={`${style.examRecordWrapper} card`}>
      <h3>کارنامه تحلیلی آزمون</h3>
      <div className={style.percentageBars}>
        <PercentageBar
          percentage={calculatePercentage(
            correctAnswers.length,
            wrongAnswers.length,
            Number(totalQuestions),

            false
          )}
          title="پاسخ های درست"
          color="green"
        />
        <PercentageBar
          percentage={calculatePercentage(
            wrongAnswers.length,
            correctAnswers.length,
            Number(totalQuestions),
            false
          )}
          title="پاسخ های غلط"
          color="red"
        />
        <PercentageBar
          percentage={(
            (unAnsweredQuestions.length / Number(totalQuestions)) *
            100
          ).toFixed(1)}
          title="سوالات نزده"
          color="yellow"
        />
      </div>
      <div className={`${style.tableWrapper} card`}>
        <OptionSwitch
          title="آزمون نمره منفی دارد؟"
          name="negativeScore"
          app={Apps.EXAM}
          onToggle={(value) => setNegativeScore(value)}
        />
        <table>
          <thead>
            <tr>
              <th>درس</th>
              <th>تعداد</th>
              <th>درست</th>
              <th>نادرست</th>
              <th>نزده</th>
              <th>درصد</th>
            </tr>
            <tr>
              <td>کلیه دروس</td>
              <td>{totalQuestions}</td>
              <td>{correctAnswers.length}</td>
              <td>{wrongAnswers.length}</td>
              <td>{unAnsweredQuestions.length}</td>
              <td>
                %
                {calculatePercentage(
                  correctAnswers.length,
                  wrongAnswers.length,
                  Number(totalQuestions),
                  negativeScore
                )}
              </td>
            </tr>
            {lessons.map((lesson, i) => {
              const lessonCorrectAnswers = correctAnswers.filter(
                (answer) => answer.lesson_id === lesson.id
              ).length;
              const lessonWrongAnswers = wrongAnswers.filter(
                (answer) => answer.lesson_id === lesson.id
              ).length;
              const lessonUnAnsweredQuestions = unAnsweredQuestions.filter(
                (answer) => answer.lesson_id === lesson.id
              ).length;

              return (
                <tr>
                  <td>{lesson.title}</td>
                  <td>{lesson.reputation_count}</td>
                  <td>{lessonCorrectAnswers}</td>
                  <td>{lessonWrongAnswers}</td>
                  <td>{lessonUnAnsweredQuestions}</td>
                  <td>
                    %
                    {calculatePercentage(
                      lessonCorrectAnswers,
                      lessonWrongAnswers,
                      lesson.reputation_count,
                      negativeScore
                    )}
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </div>
  );
}

export default ExamRecord;
