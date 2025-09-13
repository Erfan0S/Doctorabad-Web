"use client";
import { QuestionsAnswersContext } from "@repo/apps_shared_components/exam/contexts/questionsAnswersContext.tsx";
import {
  SharedFilters,
  ExamStatus,
} from "@repo/apps_shared_components/exam/types/filters.ts";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";
import { PageHeader } from "@repo/shared_modules/headers";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";

type Props = {
  children: React.ReactNode;
  title: string | React.ReactNode;
};

function ExamHeader({ children, title }: Props) {
  const searchParams = useSearchParams();
  const status = searchParams?.get(SharedFilters.STATUS);

  const { answers } = useContext(QuestionsAnswersContext);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const onBack = () => {
    if (status === ExamStatus.STARTED) {
      toast.warning("آزمون هنوز تموم نشده!");
      return;
    }
    modalActions.addModal(ModalTypes.EXAM_EXIT_CONFIRM);
  };

  return (
    <PageHeader title={title} app={Apps.EXAM} onBack={onBack}>
      {children}
    </PageHeader>
  );
}

export default ExamHeader;
