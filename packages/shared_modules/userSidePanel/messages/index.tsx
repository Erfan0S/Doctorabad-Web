import { SidePanelPageProps } from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
import MessageList from "./list";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { MessageItem } from "@repo/core/types/user";

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
              id === message.id ? { ...message, seen: 1 } : message,
            ),
          ),
        };
      },
    );
    queryClient.setQueryData(["messages_count"], (prev: any) => {
      if (!prev) return prev;
      try {
        const prevCounter = prev?.data?.data?.counter ?? 0;
        return {
          ...prev,
          data: {
            ...prev.data,
            data: {
              ...prev.data.data,
              counter: Math.max(0, prevCounter - 1),
            },
          },
        };
      } catch (e) {
        return prev;
      }
    });
  };

  return (
    <>
      <SidePanelHeader setPage={setPage} title="پیام‌های‌من" />
      <MessageList openMessage={showMessageDetail} />
    </>
  );
};

export default SidePanelMessages;
