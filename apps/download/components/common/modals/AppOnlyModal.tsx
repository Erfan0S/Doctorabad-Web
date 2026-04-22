import AppOnly from "@/components/course/appOnly";
import { ModalProps } from "@repo/core/types/modals";
import React from "react";

export default function AppOnlyModal({ data, closeModal }: ModalProps<any>) {
  return <AppOnly closeModal={closeModal} />;
}
