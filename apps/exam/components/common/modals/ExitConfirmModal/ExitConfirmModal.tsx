"use client";
import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ModalWrapper } from "@repo/shared_modules/components";
import React from "react";
import Button from "../../Button/Button";
import { useNavigationHistory } from "@repo/core/hooks/useNavigationBack";

type Props = ModalProps<{}>;

function ExitConfirmModal({ closeModal }: Props) {
  const navHistory = useNavigationHistory();

  const Buttons = () => {
    const onExit = () => {
      setTimeout(() => navHistory.goBack(), 100);
      closeModal();
    };
    return (
      <>
        <Button variant="secondary" onClick={() => closeModal()}>
          بیخیال
        </Button>
        <Button onClick={onExit}>خارج میشم</Button>
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
      <h3>میخوای از آزمون خارج بشی؟</h3>
    </ModalWrapper>
  );
}

export default ExitConfirmModal;
