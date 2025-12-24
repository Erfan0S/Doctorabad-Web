"use client";
import { useContext } from "react";
import style from "./questions.module.scss";
import { LessonType } from "@/types/exam";
import { QuestionsLessonsFilterContext } from "@/contexts/questionsLessonFilterContext";

type Props = {
  lessons: LessonType[];
};

function QuestionsLessonsFilter({ lessons }: Props) {
  const { addLessonId, clearLessons, removeLessonId, lessonIds } = useContext(
    QuestionsLessonsFilterContext
  );

  const onClickHandler = (id: number) => {
    if (lessonIds.includes(id.toString())) {
      removeLessonId(id.toString());
    } else {
      addLessonId(id.toString());
    }
  };

  return (
    <div className={style.lessonFilterWrapper}>
      <button
        type="button"
        onClick={() => clearLessons()}
        className={!lessonIds.length ? style.active : ""}
      >
        همه
      </button>
      {lessons.map((lesson) => (
        <button
          key={lesson.id}
          onClick={() => onClickHandler(lesson.id)}
          type="button"
          className={
            lessonIds.includes(lesson.id.toString()) ? style.active : ""
          }
          style={{
            backgroundColor: lessonIds.includes(lesson.id.toString())
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
