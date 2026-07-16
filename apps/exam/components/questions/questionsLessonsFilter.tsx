"use client";
import { useContext } from "react";
import { LessonType } from "@/types/exam";
import { QuestionsLessonsFilterContext } from "@/contexts/questionsLessonFilterContext";

const LESSON_BTN =
  "border-none rounded-[5px] cursor-pointer p-[10px] whitespace-nowrap focus:outline-none";

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
    <div className="w-full flex flex-row flex-nowrap overflow-auto bg-[#eeeeee] px-3 py-[10px] gap-[10px]">
      <button
        type="button"
        onClick={() => clearLessons()}
        className={`${LESSON_BTN} ${!lessonIds.length ? "bg-purple text-white" : "bg-white"}`}
      >
        همه
      </button>
      {lessons.map((lesson) => (
        <button
          key={lesson.id}
          onClick={() => onClickHandler(lesson.id)}
          type="button"
          className={`${LESSON_BTN} ${
            lessonIds.includes(lesson.id.toString())
              ? "bg-purple text-white"
              : "bg-white"
          }`}
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
