"use client";
import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ModalWrapper } from "@repo/shared_modules/components";
import React from "react";
import Button from "../../Button/Button";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import {
  ExamStatus,
  SharedFilters,
} from "@repo/apps_shared_components/exam/types";

type Props = ModalProps<{ setLoading?: (loading: boolean) => void }>;

function EndExamModal({ closeModal, data }: Props) {
  const setSearchParams = useChangeSearchParamsFilter();

  const Buttons = () => {
    const onFinish = () => {
      setTimeout(() => {
        data.setLoading && data.setLoading(true);
        setSearchParams({
          [SharedFilters.STATUS]: ExamStatus.FINISHED,
        });
        window.scrollTo(0, 0);
      }, 100);
      closeModal();
    };
    return (
      <>
        <Button variant="secondary" onClick={() => closeModal()}>
          بازگشت به آزمون
        </Button>
        <Button onClick={onFinish}>تمومش کن!</Button>
      </>
    );
  };

  return (
    <ModalWrapper
      closeModal={closeModal}
      app={Apps.EXAM}
      haveAppIcon
      submitButton={<Buttons />}
    >
      <h3>آزمون هنوز تموم نشده!</h3>
    </ModalWrapper>
  );
}

export default EndExamModal;
