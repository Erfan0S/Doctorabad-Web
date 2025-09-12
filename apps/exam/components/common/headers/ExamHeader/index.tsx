"use client";
import PageTitle from "@/components/singleDetail/PageTitle";
import { ExamDetailType, ExamSearchParams, ExamStatus } from "@/types/exam";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";
import { PageHeader } from "@repo/shared_modules/headers";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  children: React.ReactNode;
  exam: ExamDetailType;
};

function ExamHeader({ children, exam }: Props) {
  const searchParams = useSearchParams();
  const status = searchParams?.get(ExamSearchParams.STATUS);

  const onBack = () => {
    if (status === ExamStatus.STARTED) {
      toast.warning("آزمون هنوز تموم نشده!");
      return;
    }
    modalActions.addModal(ModalTypes.EXAM_EXIT_CONFIRM);
  };

  return (
    <PageHeader
      title={<PageTitle exam={exam} />}
      app={Apps.EXAM}
      onBack={onBack}
    >
      {children}
    </PageHeader>
  );
}

export default ExamHeader;
