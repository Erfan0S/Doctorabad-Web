"use client";
import AnswerSheetIcon from "@/assets/svg/answerSheet";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";
import { PageHeader } from "@repo/shared_modules/headers";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../Button/Button";
import { QuestionsAnswersContext } from "@/contexts/questionsAnswersContext";
import {
  ExamStatus,
  SharedFilters,
} from "@repo/apps_shared_components/exam/types";

type Props = {
  children: React.ReactNode;
  title: string | React.ReactNode;
  suffix?: React.ReactNode;
  backUrl?: string;
};

function ExamHeader({ children, title, suffix, backUrl }: Props) {
  const searchParams = useSearchParams();
  const status = searchParams?.get(SharedFilters.STATUS);

  const questionsAnswersContext = useContext(QuestionsAnswersContext);

  const onBack = () => {
    if (status === ExamStatus.STARTED) {
      toast.warning("آزمون هنوز تموم نشده!");
      return;
    }
    modalActions.addModal(ModalTypes.EXAM_EXIT_CONFIRM, {
      backUrl,
    });
  };

  const haveMarking = searchParams?.get(SharedFilters.MARKING);

  const pageHeaderSuffix = (
    <>
      {suffix}
      {haveMarking && (
        <Button
          onClick={() =>
            modalActions.addModal(ModalTypes.EXAM_ANSWER_SHEET, {
              questionsAnswersContext: questionsAnswersContext,
            })
          }
        >
          پاسخ برگ من
          <AnswerSheetIcon />
        </Button>
      )}
    </>
  );

  return (
    <PageHeader
      suffix={pageHeaderSuffix}
      title={title}
      app={Apps.EXAM}
      onBack={onBack}
    >
      {children}
    </PageHeader>
  );
}

export default ExamHeader;
