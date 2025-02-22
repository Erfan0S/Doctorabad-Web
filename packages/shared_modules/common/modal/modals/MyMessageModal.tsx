import React from "react";
import { ModalProps } from "@repo/core/types/modals";
import MessagesDetail from "../../../userSidePanel/modal_components/messagesDetailModal";

type Props = ModalProps<{ id: number }>;

export const MyMessageDetailModal = ({ data }: Props) => {
  return <MessagesDetail id={data.id} />;
};
