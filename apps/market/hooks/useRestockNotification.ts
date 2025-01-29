import { api } from "@/api/Api";
import { authorizeClientAction } from "@repo/core/utils";
import { useState } from "react";
import { toast } from "react-toastify";

export const useRestockNotification = (productId: number) => {
  const [loading, setLoading] = useState(false);

  const restockNotification = async () => {
    try {
      setLoading(true);
      await api.restockNotification(productId);
      setLoading(false);
      toast("درخواست شما با موفقیت ثبت شد", { type: "success" });
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    restockNotification: authorizeClientAction(restockNotification),
    restockNotificationLoading: loading,
  };
};
