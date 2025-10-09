import { ModalProps } from "@repo/core/types/modals";
import OrderDetail from "../../../userSidePanel/modal_components/orderDetail";

type Props = ModalProps<{ orderCode: string }>;

export const OrderDetailModal = ({ data, closeModal }: Props) => {
  return <OrderDetail orderCode={data.orderCode} closeModal={closeModal} />;
};
