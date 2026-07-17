"use client";
import { useRestockNotification } from "@/hooks/useRestockNotification";
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
      className="h-10 w-full cursor-pointer rounded-lg border-0 !bg-gray p-0 text-center text-[13px] font-semibold leading-10 text-white shadow-[0_3px_10px_rgba(0,0,0,0.1)] outline-none transition duration-150 hover:shadow-none"
      onClick={restockNotification}
      disabled={restockNotificationLoading}
    >
      {restockNotificationLoading ? <Loading size={22} /> : "موجود شد خبرم کن!"}
    </button>
  );
}

export default NoStockButton;
