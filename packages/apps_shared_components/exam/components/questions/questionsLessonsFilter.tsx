"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./questions.module.scss";
import { LessonType } from "../../types/exam";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import Loading from "../common/Loading";
import { SingleLessonFilter } from "../../constants/filters";
import { QuestionsAnswersContext } from "../../contexts/questionsAnswersContext";

type Props = {
  lessons: LessonType[];
};

function QuestionsLessonsFilter({ lessons }: Props) {
  const { setLessonId, lessonId } = useContext(QuestionsAnswersContext);

  const activeLesson = lessonId;
  const onClickHandler = (id?: number) => {
    setLessonId(id ? id.toString() : undefined);
  };

  return (
    <div className={style.lessonFilterWrapper}>
      <button
        type="button"
        onClick={() => onClickHandler()}
        className={!activeLesson ? style.active : ""}
      >
        همه
      </button>
      {lessons.map((lesson) => (
        <button
          key={lesson.id}
          onClick={() => onClickHandler(lesson.id)}
          type="button"
          className={activeLesson === lesson.id.toString() ? style.active : ""}
          style={{
            backgroundColor:
              activeLesson === lesson.id.toString()
                ? `#${lesson.color_code}`
                : "",
          }}
        >
          {lesson.title}
        </button>
      ))}
    </div>
  );
}

export default QuestionsLessonsFilter;
