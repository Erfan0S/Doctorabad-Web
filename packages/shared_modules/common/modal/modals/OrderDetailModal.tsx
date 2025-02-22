import React from "react";
import { ModalProps } from "@repo/core/types/modals";
import OrderDetail from "../../../userSidePanel/modal_components/orderDetail";

type Props = ModalProps<{ orderCode: string }>;

export const OrderDetailModal = ({ data }: Props) => {
  return <OrderDetail orderCode={data.orderCode} />;
};
