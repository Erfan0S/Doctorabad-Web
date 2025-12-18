"use client";
import { QuestionsAnswersProvider } from "@/contexts/questionsAnswersContext";
import { QuestionsLessonsFilterProvider } from "@/contexts/questionsLessonFilterContext";
import { routePath } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import { AuthorizeClientPage, Loading } from "@repo/shared_modules/components";
import React, { Suspense } from "react";

function singleLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthorizeClientPage baseUrl={routePath.examBasePath}>
      <Suspense fallback={<Loading app={Apps.EXAM} pageLoader />}>
        <QuestionsLessonsFilterProvider>
          <QuestionsAnswersProvider>{children}</QuestionsAnswersProvider>
        </QuestionsLessonsFilterProvider>
      </Suspense>
    </AuthorizeClientPage>
  );
}

export default singleLayout;
