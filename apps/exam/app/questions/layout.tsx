import { QuestionsAnswersProvider } from "@repo/apps_shared_components";
import React from "react";

const QuestionsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <QuestionsAnswersProvider>{children}</QuestionsAnswersProvider>;
};

export default QuestionsLayout;
