import { ModalProps } from "@repo/core/types/modals";
import OrderDetail from "../../../userSidePanel/modal_components/orderDetail";
import { OrderType } from "@repo/core/types/cart";

type Props = ModalProps<{ orderCode: string; type?: OrderType }>;

export const OrderDetailModal = ({ data, closeModal }: Props) => {
  return (
    <OrderDetail
      orderCode={data.orderCode}
      type={data.type}
      closeModal={closeModal}
    />
  );
};
