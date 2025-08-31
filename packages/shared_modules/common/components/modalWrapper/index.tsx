import { ModalProps } from "@repo/core/types/modals";
import React from "react";
import style from "./modalWrapper.module.scss";

interface Props extends ModalProps {
  children: React.ReactNode;
}

function ModalWrapper({ children, closeModal }: Props) {
  return <div>{children}</div>;
}

export default ModalWrapper;
