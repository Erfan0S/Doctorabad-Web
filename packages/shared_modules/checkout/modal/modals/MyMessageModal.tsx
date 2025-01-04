import { Modal, ModalProps } from '@/types/modals';
import MessagesDetail from '../sidePanel/messages/messagesDetailModal';

type Props = ModalProps<{ id: number }>;

export const MyMessageDetailModal = ({ data }: Props) => {
  return <MessagesDetail id={data.id} />;
};
