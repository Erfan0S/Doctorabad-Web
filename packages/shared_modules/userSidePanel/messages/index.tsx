import { SidePanelPageProps } from '@/types/sidePanel';
import React, { useEffect, useState } from 'react';
import SidePanelHeader from '../header';
import MessageList from './list';
import SingleMessage from './single';
import { modalActions } from '@/states/modals';
import { ModalTypes } from '@/types/modals';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { MessageItem } from '@/types/user';

const SidePanelMessages = ({ setPage }: SidePanelPageProps) => {
  const queryClient = useQueryClient();

  const showMessageDetail = (id: number) => {
    modalActions.addModal(ModalTypes.MY_MESSAGES_DETAIL, { id });
    queryClient.setQueryData(
      ['messages'],
      (data: InfiniteData<MessageItem[]>): InfiniteData<MessageItem[]> => {
        return {
          ...data,
          pages: data.pages.map((messages) =>
            messages.map((message) => (id === message.id ? { ...message, seen: 1 } : message))
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
