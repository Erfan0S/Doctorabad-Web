"use client";
import { QuestionsAnswersProvider } from "@repo/apps_shared_components/exam/contexts/questionsAnswersContext.tsx";
import { Apps } from "@repo/core/types/general";
import { Loading } from "@repo/shared_modules/components";
import React, { Suspense } from "react";

function singleLayout({ children }: { children: React.ReactNode }) {
  return (
    <QuestionsAnswersProvider>
      <Suspense fallback={<Loading app={Apps.EXAM} pageLoader />}>
        {children}
      </Suspense>
    </QuestionsAnswersProvider>
  );
}

export default singleLayout;
