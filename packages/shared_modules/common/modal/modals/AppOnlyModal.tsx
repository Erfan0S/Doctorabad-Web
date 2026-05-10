import React from "react";
import { ModalProps } from "@repo/core/types/modals";
import { Apps } from "@repo/core/types/general";
import AppOnly from "../../components/AppOnly/AppOnly";

type Props = ModalProps<{
  app?: Apps;
}>;

export default function AppOnlyModal({ closeModal, data }: Props) {
  return <AppOnly closeModal={closeModal} app={data?.app} />;
}
