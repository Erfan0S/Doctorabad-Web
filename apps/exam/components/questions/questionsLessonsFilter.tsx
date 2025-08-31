"use client";
import React, { useState } from "react";
import style from "./questions.module.scss";
import { LessonType } from "@/types/exam";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { SingleLessonFilter } from "@/constants/filters";

type Props = {
  lessons: LessonType[];
};

function QuestionsLessonsFilter({ lessons }: Props) {
  const changeParams = useChangeSearchParamsFilter();
  const searchParams = useSearchParams();

  const activeLesson = searchParams?.get(SingleLessonFilter) || undefined;

  return (
    <div className={style.lessonFilterWrapper}>
      <button
        type="button"
        onClick={() => changeParams({ [SingleLessonFilter]: null })}
        className={!activeLesson ? style.active : ""}
      >
        همه
      </button>
      {lessons.map((lesson) => (
        <button
          key={lesson.id}
          onClick={() =>
            changeParams({ [SingleLessonFilter]: lesson.id.toString() })
          }
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
