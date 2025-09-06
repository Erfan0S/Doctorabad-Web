"use client";
import React, { useEffect, useState } from "react";
import style from "./questions.module.scss";
import { LessonType } from "@/types/exam";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { SingleLessonFilter } from "@/constants/filters";
import Loading from "../common/Loading/Loading";

type Props = {
  lessons: LessonType[];
};

function QuestionsLessonsFilter({ lessons }: Props) {
  const changeParams = useChangeSearchParamsFilter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<number | null | undefined>(null);

  const activeLesson = searchParams?.get(SingleLessonFilter) || undefined;

  const onClickHandler = (id: number) => {
    if (isLoading !== null) return;
    setIsLoading(id);
    setTimeout(() => setIsLoading(null), 2000);
    changeParams({ [SingleLessonFilter]: id > 0 ? id?.toString() : null });
  };

  useEffect(() => {
    setIsLoading(null);
  }, [lessons]);

  return (
    <div className={style.lessonFilterWrapper}>
      <button
        type="button"
        onClick={() => onClickHandler(-1)}
        className={!activeLesson ? style.active : ""}
      >
        {isLoading === -1 ? <Loading /> : "همه"}
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
          {isLoading === lesson.id ? <Loading /> : lesson.title}
        </button>
      ))}
    </div>
  );
}

export default QuestionsLessonsFilter;
