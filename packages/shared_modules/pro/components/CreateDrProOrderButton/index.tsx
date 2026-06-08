"use client";

import React, { useState } from "react";
import { api as sharedApi } from "../../../api/Api";
import { toast } from "react-toastify";
import type { CartPayInfo } from "../../../checkout/types/cart";

type Props = {
  selectedPlanId?: number | null;
  payInfo: CartPayInfo;
};

const CreateDrProOrderButton = ({ selectedPlanId, payInfo }: Props) => {
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    if (!selectedPlanId) {
      toast("لطفا ابتدا یک پلن انتخاب کنید", { type: "error", position: "top-left" });
      return;
    }
    setLoading(true);
    try {
      const resp = await sharedApi.createDrProOrder({
        discount_code_id: (payInfo as any).discountInfo?.discount_code_id ?? 0,
        id: selectedPlanId,
        use_credit: payInfo.payWithCredit ? 1 : 0,
      });

      const url = resp?.data?.data?.url;
      if (url) {
        window.location.href = url;
        return;
      }
      toast(resp?.data?.data?.message ?? "سفارش ایجاد شد", { type: "success", position: "top-left" });
    } catch (err: any) {
      toast(err?.response?.data?.message ?? "خطا در ایجاد سفارش", { type: "error", position: "top-left" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <button onClick={onCreate} disabled={loading} style={{ width: "100%" }}>
        {loading ? "در حال پردازش..." : "خرید پلن"}
      </button>
    </div>
  );
};

export default CreateDrProOrderButton;
