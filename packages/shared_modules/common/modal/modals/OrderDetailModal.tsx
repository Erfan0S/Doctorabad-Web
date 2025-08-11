import React from "react";
import { ModalProps } from "@repo/core/types/modals";
import OrderDetail from "../../../userSidePanel/modal_components/orderDetail";
import { OrderType } from "@repo/core/types/cart";

type Props = ModalProps<{ orderCode: string; productType?: OrderType }>;

export const OrderDetailModal = ({ data, closeModal }: Props) => {
  return (
    <OrderDetail
      orderCode={data.orderCode}
      productType={data.productType}
      closeModal={closeModal}
    />
  );
};
