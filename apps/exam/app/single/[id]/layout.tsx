"use client";
import { QuestionsAnswersProvider } from "@repo/apps_shared_components/exam/contexts/questionsAnswersContext.tsx";
import { routePath } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import { AuthorizeClientPage, Loading } from "@repo/shared_modules/components";
import React, { Suspense } from "react";

function singleLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthorizeClientPage baseUrl={routePath.examBasePath}>
      <QuestionsAnswersProvider>
        <Suspense fallback={<Loading app={Apps.EXAM} pageLoader />}>
          {children}
        </Suspense>
      </QuestionsAnswersProvider>
    </AuthorizeClientPage>
  );
}

export default singleLayout;
