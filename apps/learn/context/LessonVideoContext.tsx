"use client";

import { Lesson } from "@/types/courses";
import { createContext, useState } from "react";

type LessonVideoContextType = {
  currentLeasson: Lesson | null;
  setCurrentLeasson: (lesson: Lesson | null) => void;
  bookmark: {
    lessonId: number;
    time: number;
  } | null;
  setBookmark: (bookmark: { lessonId: number; time: number } | null) => void;
  clearBookmark: () => void;
};

export const LessonVideoContext = createContext<LessonVideoContextType>(
  {} as LessonVideoContextType,
);

export const LessonVideoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentLeasson, setCurrentLeasson] = useState<Lesson | null>(null);
  const [bookmark, setBookmark] = useState<{
    lessonId: number;
    time: number;
  } | null>(null);

  const clearBookmark = () => {
    setBookmark(null);
  };

  return (
    <LessonVideoContext.Provider
      value={{
        currentLeasson,
        setCurrentLeasson,
        bookmark,
        setBookmark,
        clearBookmark,
      }}
    >
      {children}
    </LessonVideoContext.Provider>
  );
};
