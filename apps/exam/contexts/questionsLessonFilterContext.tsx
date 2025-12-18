import { createContext, useState } from "react";

export type QuestionsLessonsFilterContextProviderType = {
  lessonIds: string[];
  addLessonId: (lessonId: string) => void;
  removeLessonId: (lessonId: string) => void;
  clearLessons: () => void;
};

export const QuestionsLessonsFilterContext =
  createContext<QuestionsLessonsFilterContextProviderType>({
    lessonIds: [],
    addLessonId: () => {},
    removeLessonId: () => {},
    clearLessons: () => {},
  });

export const QuestionsLessonsFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lessonIds, setLessonIds] = useState<string[]>([]);

  const addLessonId = (lessonId: string) => {
    setLessonIds((prev) => [...prev, lessonId]);
  };
  const removeLessonId = (lessonId: string) => {
    setLessonIds((prev) => prev.filter((id) => id !== lessonId));
  };
  const clearLessons = () => {
    setLessonIds([]);
  };

  return (
    <QuestionsLessonsFilterContext.Provider
      value={{ lessonIds, addLessonId, removeLessonId, clearLessons }}
    >
      {children}
    </QuestionsLessonsFilterContext.Provider>
  );
};
