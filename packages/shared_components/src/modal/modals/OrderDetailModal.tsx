import { ModalProps } from '@/types/modals';
import OrderDetail from '../orderDetail';

type Props = ModalProps<{ orderCode: string }>;

export const OrderDetailModal = ({ data }: Props) => {
  return <OrderDetail orderCode={data.orderCode} />;
};
