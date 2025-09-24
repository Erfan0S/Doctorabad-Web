"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./examRecord.module.scss";
import { QuestionsAnswersContext } from "@repo/apps_shared_components/exam/contexts/questionsAnswersContext.tsx";
import { OptionSwitch } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import PercentageBar from "./PercentageBar";
import { calculatePercentage } from "@/utils/calculatePercentage";
import { LessonType } from "@repo/apps_shared_components/exam/types/exam.ts";

type Props = {
  lessons: LessonType[];
  totalQuestions: number | string;
};

function ExamRecord({ lessons, totalQuestions }: Props) {
  const { getCorrectAnswers, getWrongAnswers, getUnAnsweredQuestions } =
    useContext(QuestionsAnswersContext);
  const [negativeScore, setNegativeScore] = useState(false);

  const correctAnswers = getCorrectAnswers();
  const wrongAnswers = getWrongAnswers();
  const unAnsweredQuestions = getUnAnsweredQuestions();

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
