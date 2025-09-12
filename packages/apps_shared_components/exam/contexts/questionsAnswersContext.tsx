"use client";
import { createContext, useState } from "react";
import { QuestionStatus } from "../types/exam";

export type QuestionsAnswerContextType = {
  options: string[];
  answer?: string;
  userAnswer?: string;
  status: QuestionStatus;
};

type QuestionsAnswersContextType = Record<string, QuestionsAnswerContextType>;

type QuestionsAnswersContextProviderType = {
  answers: QuestionsAnswersContextType;
  addAnswer: (answer: QuestionsAnswerContextType, id: number | string) => void;
  removeAnswer: (id: number) => void;
};

const QuestionsAnswersContext =
  createContext<QuestionsAnswersContextProviderType>({
    answers: {},
    addAnswer: () => {},
    removeAnswer: () => {},
  });

const QuestionsAnswersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [answers, setAnswers] = useState<
    Record<string, QuestionsAnswerContextType>
  >({});

  const addAnswer = (
    answer: QuestionsAnswerContextType,
    id: number | string
  ) => {
    setAnswers((prev) => ({ ...prev, [id.toString()]: answer }));
  };

  const removeAnswer = (id: number) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[id.toString()];
      return newAnswers;
    });
  };

  return (
    <QuestionsAnswersContext.Provider
      value={{ answers, addAnswer, removeAnswer }}
    >
      {children}
    </QuestionsAnswersContext.Provider>
  );
};

export { QuestionsAnswersContext, QuestionsAnswersProvider };
