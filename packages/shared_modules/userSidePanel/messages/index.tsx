import React from "react";
import { SidePanelPageProps } from "../types/sidePanel";
import SidePanelHeader from "../header";
import MessageList from "./list";
import { modalActions } from "@repo/core";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { MessageItem } from "../types/user";

const SidePanelMessages = ({ setPage }: SidePanelPageProps) => {
  const queryClient = useQueryClient();

  const showMessageDetail = (id: number) => {
    modalActions.addModal(ModalTypes.MY_MESSAGES_DETAIL, { id });
    queryClient.setQueryData(
      ["messages"],
      (data: InfiniteData<MessageItem[]>): InfiniteData<MessageItem[]> => {
        return {
          ...data,
          pages: data.pages.map((messages) =>
            messages.map((message) =>
              id === message.id ? { ...message, seen: 1 } : message
            )
          ),
        };
      }
    );
  };

  return (
    <>
      <SidePanelHeader setPage={setPage} title="پیام‌های‌من" />
      <MessageList openMessage={showMessageDetail} />
    </>
  );
};

export default SidePanelMessages;
