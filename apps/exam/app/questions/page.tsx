"use client";
import QuestionsFilterButton from "@/components/questions/questionsFilter";
import QuestionBankListPage from "@/pages/QuestionBankListPage";
import { Apps } from "@repo/core/types/general";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";

function QuestionsPage() {
  return (
    <div>
      <PageHeader
        app={Apps.EXAM}
        title="بانک سوال"
        suffix={<QuestionsFilterButton />}
      />
      <QuestionBankListPage />
    </div>
  );
}

export default QuestionsPage;
