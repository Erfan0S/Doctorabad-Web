"use client";
import { QuestionsAnswersProvider } from "@/contexts/questionsAnswersContext";
import { Apps } from "@repo/core/types/general";
import { Loading } from "@repo/shared_modules/components";
import React, { Suspense } from "react";

function singleLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading app={Apps.EXAM} pageLoader />}>
      <QuestionsAnswersProvider>{children}</QuestionsAnswersProvider>
    </Suspense>
  );
}

export default singleLayout;
