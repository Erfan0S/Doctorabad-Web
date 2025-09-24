"use client";
import QuestionsFilterButton from "@/components/questions/questionsFilter";
import QuestionBankListPage from "@/pages/QuestionBankListPage";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";
import { PageHeader } from "@repo/shared_modules/headers";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import React from "react";

function QuestionsPage() {
  return (
    <div>
      <PageHeader
        app={Apps.EXAM}
        title="بانک سوال"
        suffix={<QuestionsFilterButton />}
        onBack={() =>
          modalActions.addModal(ModalTypes.EXAM_EXIT_CONFIRM, {
            perventParams: true,
            backUrl: "/",
          })
        }
      />
      <QuestionBankListPage />
    </div>
  );
}

export default QuestionsPage;
