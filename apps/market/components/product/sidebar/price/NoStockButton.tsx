"use client";
import { useRestockNotification } from "@/hooks/useRestockNotification";
import style from "./ProductSidebarPrice.module.scss";
import React from "react";
import Loading from "@/components/common/loading";

type Props = {
  productId: number;
};

function NoStockButton({ productId }: Props) {
  const { restockNotification, restockNotificationLoading } =
    useRestockNotification(productId);

  return (
    <button
      className={style.productSidebarPriceButtonNoStuck}
      onClick={restockNotification}
      disabled={restockNotificationLoading}
    >
      {restockNotificationLoading ? <Loading size={22} /> : "موجود شد خبرم کن!"}
    </button>
  );
}

export default NoStockButton;
