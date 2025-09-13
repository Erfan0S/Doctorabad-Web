"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { QuestionOptionType, QuestionStatus } from "../types/exam";

export type QuestionsAnswerContextType = {
  options: QuestionOptionType[];
  userAnswer?: string;
  status: QuestionStatus;
  answer?: string;
  lesson_id: number;
};

export type QuestionsAnswersContextType = Record<
  string,
  QuestionsAnswerContextType
>;

type QuestionsAnswersContextProviderType = {
  answers: QuestionsAnswersContextType;
  addAnswer: (answer: QuestionsAnswerContextType, id: number | string) => void;
  removeAnswer: (id: number) => void;
  getCorrectAnswers: () => QuestionsAnswerContextType[];
  getWrongAnswers: () => QuestionsAnswerContextType[];
  getUnAnsweredQuestions: () => QuestionsAnswerContextType[];
};

const QuestionsAnswersContext =
  createContext<QuestionsAnswersContextProviderType>({
    answers: {},
    addAnswer: () => {},
    removeAnswer: () => {},
    getCorrectAnswers: () => [],
    getWrongAnswers: () => [],
    getUnAnsweredQuestions: () => [],
  });

const QuestionsAnswersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [answers, setAnswers] = useState<
    Record<string, QuestionsAnswerContextType>
  >({});

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const addAnswer = useCallback(
    (answer: QuestionsAnswerContextType, id: number | string) => {
      setAnswers((prev) => ({ ...prev, [id.toString()]: answer }));
    },
    []
  );

  const removeAnswer = useCallback((id: number) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[id.toString()];
      return newAnswers;
    });
  }, []);

  const getCorrectAnswers = useCallback(() => {
    return Object.values(answers).filter(({ userAnswer, answer }) =>
      !!userAnswer && !!answer ? userAnswer === answer : false
    );
  }, [answers]);

  const getWrongAnswers = useCallback(() => {
    return Object.values(answers).filter(({ userAnswer, answer }) =>
      !!userAnswer && !!answer ? userAnswer !== answer : false
    );
  }, [answers]);

  const getUnAnsweredQuestions = useCallback(() => {
    return Object.values(answers).filter(({ userAnswer }) => !userAnswer);
  }, [answers]);

  return (
    <QuestionsAnswersContext.Provider
      value={{
        answers,
        addAnswer,
        removeAnswer,
        getCorrectAnswers,
        getWrongAnswers,
        getUnAnsweredQuestions,
      }}
    >
      {children}
    </QuestionsAnswersContext.Provider>
  );
};

export { QuestionsAnswersContext, QuestionsAnswersProvider };
