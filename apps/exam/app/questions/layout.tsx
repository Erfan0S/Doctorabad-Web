import { QuestionsAnswersProvider } from "@/contexts/questionsAnswersContext";
import React from "react";

const QuestionsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <QuestionsAnswersProvider>{children}</QuestionsAnswersProvider>;
};

export default QuestionsLayout;
